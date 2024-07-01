import { PantomathSDK } from '@src/sdk';
import { SqlProcedure, SqlTable } from '@src/model';
import assert from 'node:assert';

describe('sdk-javascript', () => {
  it('should save logs for entire job run', async () => {
    try {
      const sqlProcedure = SqlProcedure.create({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        schema: 'foo',
        name: 'bar'
      });

      const sourceDataset = SqlTable.create({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        schema: 'foo',
        name: 'source_table'
      });

      const targetDataset = SqlTable.create({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        schema: 'foo',
        name: 'target_table'
      });

      const jobRun = PantomathSDK.instance({
        /**
         * 2024.07.01 - JIM
         * combination of customerId and key in the format of <customerId>_<key> that is base64 encoded
         * customer record has the location of the key in SecretsManager.
         * apiKey is stored as a GH secret for workflow usage and use customer `automation-connectors`
         **/
        apiKey: process.env.PANTOMATH_API_KEY
      }).newJobRun<SqlProcedure>({
        job: sqlProcedure,
        sourceDataSets: [sourceDataset],
        targetDataSets: [targetDataset]
      });
      jobRun.logStart({ message: 'Starting procedure foo' });
      for (let i = 0; i < 5; i++) {
        jobRun.logProgress({ message: `Completed step ${i + 1}`, recordsEffected: i * 100 });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      await jobRun.logSuccess({ message: 'Succeeded!' });
    } catch (e) {
      assert.fail(e);
    }
  });
});
