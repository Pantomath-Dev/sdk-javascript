export enum JobDidNotRunAtMethods {
  TRIGGER_TYPE = 'TRIGGER_TYPE',
  NEXT_RUN_AT = 'NEXT_RUN_AT'
}

export function getJobDidNotRunAtMethods() {
  return Object.keys(JobDidNotRunAtMethods);
}

export type JobDidNotRunAtMethod = 'TRIGGER_TYPE' | 'NEXT_RUN_AT';

export function isJobDidNotRunAtMethod(input: string): input is JobDidNotRunAtMethod {
  return Object.keys(JobDidNotRunAtMethods).includes(input);
}
