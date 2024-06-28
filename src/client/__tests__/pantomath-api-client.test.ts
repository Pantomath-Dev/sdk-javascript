import { PantomathApiClient, PantomathApiClientParams } from '../pantomath-api-client';
import { PostJobRunLog, PostJobRunLogsRequest } from '@src/request';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
  data: {
    credentials: {
      site: {}
    }
  }
};

describe('postJobRunLogs', () => {
  afterAll(() => {
    jest.resetModules();
  });
  const goodJobRunLog: PostJobRunLog = {
    jobRunId: 'jobRunId',
    objectName: 'objectName',
    objectType: 'JOB',
    fullyQualifiedObjectName: 'fullyQualifiedObjectName',
    status: 'SUCCEEDED',
    message: 'message',
    sourceDataSets: [
      {
        objectName: 'sourceDataSets_objectName',
        objectType: 'JOB',
        fullyQualifiedObjectName: 'sourceDataSets_fqn'
      }
    ],
    targetDataSets: [
      {
        objectName: 'targetDataSets_objectName',
        objectType: 'JOB',
        fullyQualifiedObjectName: 'targetDataSets_fqn'
      }
    ],
    isoTimestamp: 'isoTimestamp'
  };

  it('should be successful with undefined in array ', async () => {
    const params: PantomathApiClientParams = {};
    const client: PantomathApiClient = new PantomathApiClient(params);
    const testLogs: PostJobRunLogsRequest = {
      jobRunLogs: [goodJobRunLog, undefined as unknown as PostJobRunLog, goodJobRunLog]
    };
    mockedAxios.post.mockResolvedValue(mockResponse);
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    await client.postJobRunLogs(testLogs);
    const call = mockedAxios.post.mock.calls[0][1] as PostJobRunLogsRequest;
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(call.jobRunLogs.length).toEqual(2);
  });
});
