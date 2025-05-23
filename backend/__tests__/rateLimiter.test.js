import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Rate Limiting Tests', () => {
  test('General API rate limiting', async () => {
    // Make multiple requests to trigger rate limit
    const requests = Array(101).fill().map(() => 
      request(app).get('/api/health')
    );
    
    const responses = await Promise.all(requests);
    
    // Check if the last request was rate limited
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status).toBe(429); // 429 is Too Many Requests
    expect(lastResponse.body.message).toContain('Too many requests');
  });

  test('Auth route rate limiting', async () => {
    // Make multiple requests to auth endpoint
    const requests = Array(6).fill().map(() => 
      request(app).post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'password123' })
    );
    
    const responses = await Promise.all(requests);
    
    // Check if the last request was rate limited
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status).toBe(429);
    expect(lastResponse.body.message).toContain('Too many login attempts');
  });

  test('Sensitive operation rate limiting', async () => {
    // Make multiple requests to a sensitive endpoint
    const requests = Array(11).fill().map(() => 
      request(app).post('/api/v1/weddings')
        .send({ name: 'Test Wedding' })
    );
    
    const responses = await Promise.all(requests);
    
    // Check if the last request was rate limited
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status).toBe(429);
    expect(lastResponse.body.message).toContain('Too many sensitive operations');
  });
}); 