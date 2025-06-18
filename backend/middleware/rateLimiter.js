import rateLimit from 'express-rate-limit';
// import RedisStore from 'rate-limit-redis';
// import Redis from 'ioredis';
// 
// Create Redis client
// const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// General API rate limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for sensitive operations
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many sensitive operations, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

// Dynamic rate limiter based on user role
export const createRoleBasedLimiter = (role) => {
  const limits = {
    admin: 1000,
    vendor: 500,
    user: 100,
    guest: 50
  };

  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: limits[role] || 50, // Default to guest limit if role not found
    message: `Rate limit exceeded for ${role} role`,
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Redis-based rate limiter for distributed systems
// export const redisLimiter = rateLimit({
//   store: new RedisStore({
//     client: redisClient,
//     prefix: 'rate-limit:',
//   }),
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
//   standardHeaders: true,
//   legacyHeaders: false,
// }); 