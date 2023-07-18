import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type AWSLambdaConstructorParams = {
  name: string;
};

export class AWSLambda extends Job {
  private readonly _name: string;

  constructor(params: AWSLambdaConstructorParams) {
    super();
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.AWS_LAMBDA;
  }

  public get fullyQualifiedObjectName(): string {
    return this._name;
  }

  static create(params: AWSLambdaConstructorParams): AWSLambda {
    return new AWSLambda(params);
  }
}
