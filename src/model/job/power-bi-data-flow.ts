import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type PowerBiDataFlowConstructorParams = {
  groupId: string;
  objectId: string;
  name: string;
};

export class PowerBiDataFlow extends Job {
  private readonly _groupId: string;

  private readonly _objectId: string;

  private readonly _name: string;

  constructor(params: PowerBiDataFlowConstructorParams) {
    super();
    this._groupId = params.groupId;
    this._objectId = params.objectId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.POWER_BI_DATAFLOW;
  }

  public get fullyQualifiedObjectName(): string {
    return `app.powerbi.com/groups/${this._groupId}/dataflows/${this._objectId}`.toLowerCase();
  }

  static create(params: PowerBiDataFlowConstructorParams): PowerBiDataFlow {
    return new PowerBiDataFlow(params);
  }
}
