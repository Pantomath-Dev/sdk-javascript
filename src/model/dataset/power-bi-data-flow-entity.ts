import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type PowerBIDataFlowEntityConstructorParams = {
  name: string;
  groupId: string;
  objectId: string;
};

export class PowerBiDataFlowEntity extends DataSet {
  private readonly _name: string;

  private readonly _groupId: string;

  private readonly _objectId: string;

  private constructor(params: PowerBIDataFlowEntityConstructorParams) {
    super();
    this._name = params.name;
    this._groupId = params.groupId;
    this._objectId = params.objectId;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.POWER_BI_DATAFLOW_ENTITY;
  }

  get fullyQualifiedObjectName(): string {
    return `app.powerbi.com/groups/${this._groupId}/dataflows/${this._objectId}/syntheticEntity/${this._name}`.toLowerCase();
  }

  static create(params: PowerBIDataFlowEntityConstructorParams): PowerBiDataFlowEntity {
    return new PowerBiDataFlowEntity(params);
  }
}
