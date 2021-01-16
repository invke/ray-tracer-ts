module.exports = {
  testEnvironment: 'node',
  roots: [
    '<rootDir>/spec'
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src',
    '<rootDir>/spec'
  ],
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    '<rootDir>/spec/support/customMatchers.ts'
  ],
  verbose: true
}
