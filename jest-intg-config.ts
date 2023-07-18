import type { Config } from 'jest';
import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testMatch: ['**/__tests__**/?(*.)+(in-test).[jt]s?(x)']
};

export default config;
