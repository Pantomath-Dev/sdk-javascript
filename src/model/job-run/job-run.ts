import { DataSet } from '@src/model/dataset';
import { Job } from '@src/model/job';
import { JobRunLog } from '@src/model/job-run/job-run-log';
import { PantomathApiClient } from '@src/client';
import { v4 as uuidv4 } from 'uuid';
import { JobRunLogStatuses } from '@src/enum';
import { PostJobRunLogsRequest } from '@src/request';

export type JobRunConstructorParams<TJob extends Job> = {
  job: TJob;
  name?: string;
  nextRunAt?: Date;
  sourceDataSets?: DataSet[];
  targetDataSets?: DataSet[];
};

export type JobRunConstructorParamsInternal<TJob extends Job> = JobRunConstructorParams<TJob> & {
  pantomathApiClient: PantomathApiClient;
};

export type JobRunLogParams = {
  message: string;
  recordsEffected?: number;
};

export type JobRunStartedParams = JobRunLogParams & {
  message?: string;
};

export type JobRunProgressParams = JobRunLogParams;

export type JobRunWarningParams = JobRunLogParams;

export type JobRunSuccessParams = JobRunLogParams & {
  message?: string;
};

export type JobRunFailureParams = JobRunLogParams & {
  message?: string;
};

type JobRunReportingFlags = {
  reportedStart: boolean;
  reportedSuccess: boolean;
  reportedFailure: boolean;
};

export function mapJobRunLogsToPostJobRunLogsRequest<TJob extends Job>(
  jobRunLogs: JobRunLog<TJob>[]
): PostJobRunLogsRequest {
  return {
    jobRunLogs: jobRunLogs.map((jobRunLog) => {
      return {
        uniqueId: jobRunLog.uniqueId,
        jobRunId: jobRunLog.jobRun.id,
        objectName: jobRunLog.jobRun.job.name,
        objectType: jobRunLog.jobRun.job.type,
        fullyQualifiedObjectName: jobRunLog.jobRun.job.fullyQualifiedObjectName,
        status: jobRunLog.status,
        message: jobRunLog.message,
        recordsEffected: jobRunLog.recordsEffected,
        nextRunAt: jobRunLog.jobRun.nextRunAt?.toISOString(),
        sourceDataSets: jobRunLog.jobRun.sourceDataSets.map((soureDataSet) => {
          return {
            objectName: soureDataSet.name,
            objectType: soureDataSet.type,
            fullyQualifiedObjectName: soureDataSet.fullyQualifiedObjectName
          };
        }),
        targetDataSets: jobRunLog.jobRun.targetDataSets.map((targetDataSet) => {
          return {
            objectName: targetDataSet.name,
            objectType: targetDataSet.type,
            fullyQualifiedObjectName: targetDataSet.fullyQualifiedObjectName
          };
        }),
        isoTimestamp: jobRunLog.timestamp.toISOString()
      };
    })
  };
}

export class JobRun<TJob extends Job> {
  private readonly _job: TJob;

  private readonly _id: string;

  private readonly _name?: string;

  private readonly _sourceDataSets: DataSet[];

  private readonly _targetDataSets: DataSet[];

  private readonly _pantomathApiClient: PantomathApiClient;

  private readonly _jobRunReportingFlags: JobRunReportingFlags;

  private readonly _nextRunAt?: Date;

  private _logBuffer: JobRunLog<TJob>[];

  private _pushingLogs: boolean;

  constructor(params: JobRunConstructorParamsInternal<TJob>) {
    this._job = params.job;
    this._id = uuidv4();
    this._name = params.name;
    this._sourceDataSets = params.sourceDataSets ?? [];
    this._targetDataSets = params.targetDataSets ?? [];
    this._nextRunAt = params.nextRunAt;
    this._pantomathApiClient = params.pantomathApiClient;
    this._logBuffer = [];
    this._pushingLogs = false;
    this._jobRunReportingFlags = {
      reportedStart: false,
      reportedSuccess: false,
      reportedFailure: false
    };
  }

  private _getNormalizedMessage(message: string): string {
    const lengthCappedMessage = message.substring(0, 1000);
    const jobRunNamePrefix = this._name ? `${this._name} running in ` : '';
    const jobName = this._job.name;
    return `${jobRunNamePrefix}${jobName}: ${lengthCappedMessage}`;
  }

  public get job(): TJob {
    return this._job;
  }

  public get id(): string {
    return this._id;
  }

  public get sourceDataSets(): DataSet[] {
    return this._sourceDataSets;
  }

  public get targetDataSets(): DataSet[] {
    return this._targetDataSets;
  }

  public get nextRunAt(): Date | undefined {
    return this._nextRunAt;
  }

  public logStart(params: JobRunStartedParams): void {
    if (this._jobRunReportingFlags.reportedStart) {
      throw new Error(`reportStart can only be called once per JobRun instance. Job Run ${this._job.name}`);
    }
    this._jobRunReportingFlags.reportedStart = true;
    this._logBuffer.push(
      JobRunLog.create({
        jobRun: this,
        status: JobRunLogStatuses.STARTED,
        message: this._getNormalizedMessage(params.message ?? `Started`),
        recordsEffected: params.recordsEffected,
        timestamp: new Date()
      })
    );
  }

  public logProgress(params: JobRunProgressParams): void {
    this._logBuffer.push(
      JobRunLog.create({
        jobRun: this,
        status: JobRunLogStatuses.IN_PROGRESS,
        message: this._getNormalizedMessage(params.message),
        recordsEffected: params.recordsEffected,
        timestamp: new Date()
      })
    );
  }

  public logWarning(params: JobRunWarningParams): void {
    this._logBuffer.push(
      JobRunLog.create({
        jobRun: this,
        status: JobRunLogStatuses.WARNING,
        message: this._getNormalizedMessage(params.message),
        recordsEffected: params.recordsEffected,
        timestamp: new Date()
      })
    );
  }

  public async logSuccess(params: JobRunSuccessParams): Promise<void> {
    if (this._jobRunReportingFlags.reportedSuccess) {
      throw new Error(`reportSuccess can only be called once per JobRun instance. Job Run: ${this._job.name}`);
    }
    if (this._jobRunReportingFlags.reportedFailure) {
      throw new Error(
        `reportSuccess cannot be called because reportFailure has already been called. Job Run: ${this._job.name}`
      );
    }
    this._jobRunReportingFlags.reportedSuccess = true;
    this._logBuffer.push(
      JobRunLog.create({
        jobRun: this,
        status: JobRunLogStatuses.SUCCEEDED,
        message: this._getNormalizedMessage(params.message ?? `Succeeded`),
        recordsEffected: params.recordsEffected,
        timestamp: new Date()
      })
    );
    await this.pushAndClearLogBuffer();
  }

  public async logFailure(params: JobRunFailureParams): Promise<void> {
    if (this._jobRunReportingFlags.reportedFailure) {
      throw new Error(`reportFailure can only be called once per JobRun instance. Job Run: ${this._job.name}`);
    }
    if (this._jobRunReportingFlags.reportedSuccess) {
      throw new Error(
        `reportFailure cannot be called because reportSuccess has already been called. Job Run: ${this._job.name}`
      );
    }
    this._jobRunReportingFlags.reportedFailure = true;
    this._logBuffer.push(
      JobRunLog.create({
        jobRun: this,
        status: JobRunLogStatuses.FAILED,
        message: this._getNormalizedMessage(params.message ?? `Failed`),
        recordsEffected: params.recordsEffected,
        timestamp: new Date()
      })
    );
    await this.pushAndClearLogBuffer();
  }

  protected async pushAndClearLogBuffer() {
    if (!this._pushingLogs && this._logBuffer.length) {
      this._pushingLogs = true;
      try {
        await this._pantomathApiClient.postJobRunLogs(mapJobRunLogsToPostJobRunLogsRequest<TJob>(this._logBuffer));
      } catch (e) {
        console.error(e);
      } finally {
        this._pushingLogs = false;
      }
      this._logBuffer = [];
    }
  }
}
