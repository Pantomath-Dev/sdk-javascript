import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type ADFDatasetConstructorParams = {
  name: string;
  dataSetId: string;
};

export class ADFDataset extends DataSet {
  private readonly _name: string;

  private readonly _dataSetId: string;

  private constructor(params: ADFDatasetConstructorParams) {
    super();
    this._name = params.name;
    this._dataSetId = params.dataSetId;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.ADF_DATASET;
  }

  get fullyQualifiedObjectName(): string {
    return this._dataSetId;
  }

  static create(params: ADFDatasetConstructorParams): ADFDataset {
    return new ADFDataset(params);
  }
}
