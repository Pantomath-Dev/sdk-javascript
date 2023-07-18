import { JobType } from '@src/enum';

export abstract class Job {
  abstract get name(): string;

  abstract get type(): JobType;

  abstract get fullyQualifiedObjectName(): string;
}
