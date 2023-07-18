import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type ADFPipelineConstructorParams = {
  pipelineId: string;
  name: string;
};

export class ADFPipeline extends Job {
  private readonly _pipelineId: string;

  private readonly _name: string;

  constructor(params: ADFPipelineConstructorParams) {
    super();
    this._pipelineId = params.pipelineId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.ADF_PIPELINE;
  }

  public get fullyQualifiedObjectName(): string {
    return this._pipelineId.toLowerCase();
  }

  static create(params: ADFPipelineConstructorParams): ADFPipeline {
    return new ADFPipeline(params);
  }
}
