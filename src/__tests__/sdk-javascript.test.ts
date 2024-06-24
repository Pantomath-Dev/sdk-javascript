import { PantomathSDK } from '@src/sdk';
import { SqlProcedure, SqlTable } from '@src/model';

describe('sdk-javascript', () => {
  it('should save logs for entire job run', async () => {
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
      apiKey: 'NTk1X3pmR1lIWDVadHVuN3NDWDdXU21qWXc5WTI='
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
  });
});
