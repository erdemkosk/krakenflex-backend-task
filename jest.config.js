/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/config/**', // src/config dizinindeki tüm dosyalar hariç
    '!<rootDir>/node_modules/**', // node_modules dizinindeki dosyalar hariç
  ],
};