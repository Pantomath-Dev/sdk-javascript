export enum JobTriggerTypes {
  SCHEDULE = 'SCHEDULE',
  MANUAL = 'MANUAL',
  UNKNOWN = 'UNKNOWN'
}

export function getJobTriggerTypes(): string[] {
  return Object.keys(JobTriggerTypes);
}

export type JobTriggerType = 'SCHEDULE' | 'MANUAL' | 'UNKNOWN';

export function isJobTriggerType(input: string): input is JobTriggerType {
  return Object.keys(JobTriggerTypes).includes(input);
}
