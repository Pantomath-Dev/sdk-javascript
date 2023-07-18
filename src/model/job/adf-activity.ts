import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type ADFActivityConstructorParams = {
  pipelineId: string;
  name: string;
};

export class ADFActivity extends Job {
  private readonly _pipelineId: string;

  private readonly _name: string;

  constructor(params: ADFActivityConstructorParams) {
    super();
    this._pipelineId = params.pipelineId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.ADF_ACTIVITY;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._pipelineId}/activities/${this._name}`.toLowerCase();
  }

  static create(params: ADFActivityConstructorParams): ADFActivity {
    return new ADFActivity(params);
  }
}
