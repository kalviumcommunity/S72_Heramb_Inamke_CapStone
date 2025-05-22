import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../app.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import Wedding from '../models/Wedding.js';

let mongoServer;
let testUser;
let testWedding;
let authToken;

describe('Task API Tests', () => {
  beforeAll(async () => {
    // Create in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Disconnect from any existing connections
    await mongoose.disconnect();

    // Connect to the in-memory database
    await mongoose.connect(mongoUri);

    // Drop all collections to ensure clean state
    await Promise.all([
      User.collection.drop().catch(() => {}),
      Wedding.collection.drop().catch(() => {}),
      Task.collection.drop().catch(() => {})
    ]);

    // Create test user with unique apiKey
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'couple',
      apiKey: 'test-api-key-1'
    });

    // Create test wedding
    testWedding = await Wedding.create({
      couple: [testUser._id],
      date: new Date('2024-12-31'),
      venue: 'Test Venue',
      budget: 50000
    });

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    // Drop all collections before disconnecting
    await Promise.all([
      User.collection.drop().catch(() => {}),
      Wedding.collection.drop().catch(() => {}),
      Task.collection.drop().catch(() => {})
    ]);
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('POST /api/v1/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Book Venue',
        description: 'Contact and book the wedding venue',
        dueDate: new Date('2024-06-30'),
        assignedTo: testUser._id,
        wedding: testWedding._id,
        status: 'Pending'
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.task.title).toBe(taskData.title);
      expect(response.body.task.description).toBe(taskData.description);
      expect(response.body.task.status).toBe('Pending');
    });

    it('should return 400 for invalid task data', async () => {
      const invalidTaskData = {
        title: '', // Empty title should fail
        description: 'Test description',
        dueDate: new Date('2024-06-30')
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidTaskData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/tasks', () => {
    it('should get all tasks', async () => {
      // Create test tasks
      await Task.create([
        {
          title: 'Task 1',
          description: 'Description 1',
          dueDate: new Date('2024-06-30'),
          assignedTo: testUser._id,
          wedding: testWedding._id,
          status: 'Pending'
        },
        {
          title: 'Task 2',
          description: 'Description 2',
          dueDate: new Date('2024-07-30'),
          assignedTo: testUser._id,
          wedding: testWedding._id,
          status: 'In Progress'
        }
      ]);

      const response = await request(app)
        .get('/api/v1/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.count).toBe(2);
    });
  });

  describe('GET /api/v1/tasks/:id', () => {
    it('should get a single task by id', async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date('2024-06-30'),
        assignedTo: testUser._id,
        wedding: testWedding._id,
        status: 'Pending'
      });

      const response = await request(app)
        .get(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.task.title).toBe('Test Task');
      expect(response.body.task.description).toBe('Test Description');
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/v1/tasks/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/tasks/:id', () => {
    it('should update a task', async () => {
      const task = await Task.create({
        title: 'Original Task',
        description: 'Original Description',
        dueDate: new Date('2024-06-30'),
        assignedTo: testUser._id,
        wedding: testWedding._id,
        status: 'Pending'
      });

      const updateData = {
        title: 'Updated Task',
        status: 'In Progress'
      };

      const response = await request(app)
        .put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.task.title).toBe('Updated Task');
      expect(response.body.task.status).toBe('In Progress');
    });
  });

  describe('DELETE /api/v1/tasks/:id', () => {
    it('should delete a task', async () => {
      const task = await Task.create({
        title: 'Task to Delete',
        description: 'Description',
        dueDate: new Date('2024-06-30'),
        assignedTo: testUser._id,
        wedding: testWedding._id,
        status: 'Pending'
      });

      const response = await request(app)
        .delete(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify task is deleted
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });
  });
}); 