const ignorePaths = [
  '<rootDir>/.next/',
  '<rootDir>/node_modules/',
  '<rootDir>/cypress/',
];
const minCoverage = 40;

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ignorePaths,
  coveragePathIgnorePatterns: ignorePaths,
  watchPathIgnorePatterns: ignorePaths,

  // Code Coverage
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      statements: minCoverage,
      branches: minCoverage,
      functions: minCoverage,
      lines: minCoverage,
    },
  },
};
