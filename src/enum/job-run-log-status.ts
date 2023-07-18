export enum JobRunLogStatuses {
  STARTED = 'STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  QUEUED = 'QUEUED',
  WARNING = 'WARNING'
}

export function getJobRunLogStatuses(): string[] {
  return Object.keys(JobRunLogStatuses);
}

export type JobRunLogStatus = 'STARTED' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'QUEUED' | 'WARNING';

export function isJobRunLogStatus(input: string): input is JobRunLogStatus {
  return Object.keys(JobRunLogStatuses).includes(input);
}
