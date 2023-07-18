import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type SynapseActivityConstructorParams = {
  pipelineId: string;
  name: string;
};

export class SynapseActivity extends Job {
  private readonly _pipelineId: string;

  private readonly _name: string;

  constructor(params: SynapseActivityConstructorParams) {
    super();
    this._pipelineId = params.pipelineId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.ACTIVITY;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._pipelineId}/activities/${this._name}`.toLowerCase();
  }

  static create(params: SynapseActivityConstructorParams): SynapseActivity {
    return new SynapseActivity(params);
  }
}
