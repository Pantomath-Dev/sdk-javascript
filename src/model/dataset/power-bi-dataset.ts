import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type PowerBIDatasetConstructorParams = {
  name: string;
  workspaceId: string;
  datasetId: string;
};

export class PowerBIDataset extends DataSet {
  private readonly _name: string;

  private readonly _workspaceId: string;

  private readonly _datasetId: string;

  private constructor(params: PowerBIDatasetConstructorParams) {
    super();
    this._name = params.name;
    this._workspaceId = params.workspaceId;
    this._datasetId = params.datasetId;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.POWER_BI_DATASET;
  }

  get fullyQualifiedObjectName(): string {
    return `app.powerbi.com/groups/${this._workspaceId}/datasets/${this._datasetId}`.toLowerCase();
  }

  static create(params: PowerBIDatasetConstructorParams): PowerBIDataset {
    return new PowerBIDataset(params);
  }
}
