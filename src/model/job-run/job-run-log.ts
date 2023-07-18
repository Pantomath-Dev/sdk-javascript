import { JobRunLogStatus } from '@src/enum';
import { JobRun } from '@src/model/job-run/job-run';
import { Job } from '@src/model/job/job';
import { v4 as uuidv4 } from 'uuid';

export type JobRunLogConstructorParams<TJob extends Job> = {
  jobRun: JobRun<TJob>;
  status: JobRunLogStatus;
  message: string;
  recordsEffected?: number;
  timestamp: Date;
};

export class JobRunLog<TJob extends Job> {
  private readonly _uniqueId: string;

  private readonly _jobRun: JobRun<TJob>;

  private readonly _status: JobRunLogStatus;

  private readonly _message: string;

  private readonly _recordsEffected?: number;

  private readonly _timestamp: Date;

  constructor(params: JobRunLogConstructorParams<TJob>) {
    this._uniqueId = uuidv4();
    this._jobRun = params.jobRun;
    this._status = params.status;
    this._message = params.message;
    this._recordsEffected = params.recordsEffected;
    this._timestamp = params.timestamp;
  }

  public get uniqueId() {
    return this._uniqueId;
  }

  public get jobRun() {
    return this._jobRun;
  }

  public get status() {
    return this._status;
  }

  public get message(): string {
    return this._message;
  }

  public get recordsEffected(): number | undefined {
    return this._recordsEffected;
  }

  public get timestamp(): Date {
    return this._timestamp;
  }

  static create<TJob extends Job>(params: JobRunLogConstructorParams<TJob>): JobRunLog<TJob> {
    return new JobRunLog(params);
  }
}
