import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type SynapsePipelineConstructorParams = {
  pipelineId: string;
  name: string;
};

export class SynapsePipeline extends Job {
  private readonly _pipelineId: string;

  private readonly _name: string;

  constructor(params: SynapsePipelineConstructorParams) {
    super();
    this._pipelineId = params.pipelineId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.PIPELINE;
  }

  public get fullyQualifiedObjectName(): string {
    return this._pipelineId;
  }

  static create(params: SynapsePipelineConstructorParams): SynapsePipeline {
    return new SynapsePipeline(params);
  }
}
