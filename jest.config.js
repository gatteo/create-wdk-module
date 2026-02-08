export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  transform: {},
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['text', 'html']
}
