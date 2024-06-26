import axios from 'axios';
import { PostJobRunLog, PostJobRunLogsRequest } from '@src/request';

const {
  PANTOMATH_SDK_POST_JOB_LOGS_PAGE_SIZE = '500',
  PANTOMATH_API_BASE_URL = 'https://api.dev-pantomath.org/v1',
  PANTOMATH_API_KEY = ''
} = process.env;

export type PantomathApiClientParams = {
  apiBaseUrl?: string;
  apiKey?: string;
  jobLogsRequestPageSize?: number;
};

let pantomathApiClient: PantomathApiClient | undefined = undefined;

export class PantomathApiClient {
  private readonly _apiBaseUrl: string;

  private readonly _apiKey: string;

  private readonly _jobLogsRequestPageSize: number;

  constructor(params: PantomathApiClientParams) {
    this._apiBaseUrl = params.apiBaseUrl ?? PANTOMATH_API_BASE_URL;
    this._apiKey = params.apiKey ?? PANTOMATH_API_KEY;
    this._jobLogsRequestPageSize = this._jobLogsRequestPageSize ?? parseInt(PANTOMATH_SDK_POST_JOB_LOGS_PAGE_SIZE);
  }

  static instance(params: PantomathApiClientParams) {
    if (!pantomathApiClient) {
      pantomathApiClient = new PantomathApiClient(params);
    }
    return pantomathApiClient;
  }

  async postJobRunLogs(postJobRunLogsRequest: PostJobRunLogsRequest) {
    const jobRunLogs: PostJobRunLog[] = postJobRunLogsRequest.jobRunLogs;
    console.log(jobRunLogs.length);
    console.log(this._jobLogsRequestPageSize);
    do {
      const pageOfJobRunLogs: PostJobRunLog[] = [];
      const jobRunLogLength = jobRunLogs.length;
      for (let i = 0; i < this._jobLogsRequestPageSize && i <= jobRunLogLength; i++) {
        console.log(i);
        const jobRunLog = jobRunLogs.shift();
        console.log(jobRunLog);
        if (jobRunLog) {
          pageOfJobRunLogs.push(jobRunLog);
        }
      }
      console.log('TIME TO POST');
      await axios.post(
        `${this._apiBaseUrl}/job-run-logs`,
        {
          jobRunLogs: pageOfJobRunLogs
        },
        {
          headers: {
            'x-api-key': this._apiKey,
            'x-sdk-type': 'JavaScript'
          }
        }
      );
    } while (jobRunLogs.length);
  }
}
