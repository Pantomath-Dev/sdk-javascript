import type { Config } from 'jest';
import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testMatch: ['**/__tests__**/?(*.)+(in-test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/test/setup/set-jest-env.ts']
};

export default config;
