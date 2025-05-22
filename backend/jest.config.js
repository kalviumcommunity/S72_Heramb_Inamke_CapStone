export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  testTimeout: 30000
}; 