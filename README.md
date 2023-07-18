# Pantomath Javascript SDK

Send custom, realtime logs to Pantomath through the Pantomath Javascript SDK

## 💻 Installation and Setup

1. Install the Pantomath Javacript SDK:

```sh
npm i @pantomath/sdk-javascript
```

2. Add configuration ENVs to your runtime:

```sh
PANTOMATH_API_BASE_URL = ******,
PANTOMATH_API_KEY = ******
```

## Example

```sh
import { PantomathSDK, SqlProcedure, SqlTable } from '@pantomath/sdk-javascript';

export async function main() {
  const sqlProcedure = SqlProcedure.create({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    schema: 'foo',
    name: 'bar',
  });

  const sourceDataset = SqlTable.create({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    schema: 'foo',
    name: 'source_table',
  });

  const targetDataset = SqlTable.create({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    schema: 'foo',
    name: 'target_table',
  });

  const pantomathSDK = PantomathSDK.instance({
    apiKey: '****',
  });

  const jobRun = pantomathSDK.newJobRun<SqlProcedure>({
    job: sqlProcedure,
    sourceDataSets: [sourceDataset],
    targetDataSets: [targetDataset],
  });

  jobRun.logStart({ message: 'Starting procedure foo' });
  for (let i = 0; i < 5; i++) {
    jobRun.logProgress({ message: `Completed step ${i + 1}`, recordsEffected: i * 100 });
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  await jobRun.logSuccess({ message: 'Succeeded!' });
}

main();
```
