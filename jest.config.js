/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 60000,
  globalSetup: '<rootDir>/src/utils/test/globalSetup.ts',
  globalTeardown: '<rootDir>/src/utils/test/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/utils/test/setupFile.ts'],
};
