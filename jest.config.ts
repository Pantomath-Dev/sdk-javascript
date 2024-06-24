import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  silent: true,
  maxWorkers: '50%',
  testEnvironment: 'node',
  testTimeout: 60000,
  testMatch: ['**/__tests__**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@root/(.*)$': '<rootDir>/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        compiler: 'typescript'
      }
    ]
  },
  setupFiles: ['<rootDir>/test/setup/set-jest-env.ts', '<rootDir>/test/setup/config-ts-auto-mock.ts'],
  modulePathIgnorePatterns: ['<rootDir>/lib/']
};

export default config;
