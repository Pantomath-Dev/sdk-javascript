import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type ADFDataFlowConstructorParams = {
  name: string;
  dataFlowId: string;
};

export class AdfDataFlow extends DataSet {
  private readonly _name: string;

  private readonly _dataFlowId: string;

  private constructor(params: ADFDataFlowConstructorParams) {
    super();
    this._name = params.name;
    this._dataFlowId = params.dataFlowId;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.ADF_DATA_FLOW;
  }

  get fullyQualifiedObjectName(): string {
    return this._dataFlowId;
  }

  static create(params: ADFDataFlowConstructorParams): AdfDataFlow {
    return new AdfDataFlow(params);
  }
}
