import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

async function testRateLimit() {
  console.log('Testing general API rate limit...');
  try {
    // Make 101 requests to trigger rate limit
    for (let i = 0; i < 101; i++) {
      const response = await axios.get(`${BASE_URL}/api/health`);
      console.log(`Request ${i + 1}: Status ${response.status}`);
    }
  } catch (error) {
    console.log('Rate limit hit!');
    console.log('Error:', error.response?.data || error.message);
  }

  console.log('\nTesting auth rate limit...');
  try {
    // Make 6 requests to trigger auth rate limit
    for (let i = 0; i < 6; i++) {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log(`Auth request ${i + 1}: Status ${response.status}`);
    }
  } catch (error) {
    console.log('Auth rate limit hit!');
    console.log('Error:', error.response?.data || error.message);
  }
}

testRateLimit(); 