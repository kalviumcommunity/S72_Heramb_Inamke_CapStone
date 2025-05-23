import express from 'express';
import redisClient from '../config/redisClient.js';

const router = express.Router();

// GET /api/test/redis
router.get('/redis', async (req, res) => {
  try {
    const cacheKey = 'test:key';
    let value = await redisClient.get(cacheKey);

    if (value) {
      return res.status(200).json({ source: 'cache', value });
    }

    value = 'Hello from Redis!';
    await redisClient.set(cacheKey, value, { EX: 60 }); // Cache for 60 seconds

    res.status(200).json({ source: 'server', value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Redis test failed' });
  }
});

export default router; 