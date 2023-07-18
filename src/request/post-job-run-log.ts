import { DataSetType, JobRunLogStatus, JobType } from '@src/enum';

export type PostJobRunLog = {
  jobRunId: string;
  objectName: string;
  objectType: JobType | DataSetType;
  fullyQualifiedObjectName: string;
  status: JobRunLogStatus;
  message: string;
  recordsEffected?: number;
  sourceDataSets: Array<{
    objectName: string;
    objectType: JobType | DataSetType;
    fullyQualifiedObjectName: string;
  }>;
  targetDataSets: Array<{
    objectName: string;
    objectType: JobType | DataSetType;
    fullyQualifiedObjectName: string;
  }>;
  isoTimestamp: string;
};

export type PostJobRunLogsRequest = {
  jobRunLogs: Array<PostJobRunLog>;
};
