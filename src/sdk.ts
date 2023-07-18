import { Job, JobRun, JobRunConstructorParams } from '@src/model';
import { PantomathApiClient } from '@src/client';

export type PantomathSDKConstructorParams = {
  apiBaseUrl?: string;
  apiKey?: string;
};

let pantomathSDK: PantomathSDK | undefined = undefined;

export class PantomathSDK {
  private readonly _apiBaseUrl?: string;

  private readonly _apiKey?: string;

  constructor(params: PantomathSDKConstructorParams) {
    this._apiBaseUrl = params.apiBaseUrl;
    this._apiKey = params.apiKey;
  }

  static instance(params: PantomathSDKConstructorParams) {
    if (!pantomathSDK) {
      pantomathSDK = new PantomathSDK(params);
    }
    return pantomathSDK;
  }

  newJobRun<TJob extends Job>(params: JobRunConstructorParams<TJob>) {
    return new JobRun<TJob>({
      ...params,
      pantomathApiClient: PantomathApiClient.instance({
        apiBaseUrl: this._apiBaseUrl,
        apiKey: this._apiKey
      })
    });
  }
}
