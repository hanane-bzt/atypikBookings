module.exports = {
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/__tests__/**/*.test.js"
  ],
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "controllers/**/*.js",
    "models/**/*.js",
    "!models/index.js",
  ],
};