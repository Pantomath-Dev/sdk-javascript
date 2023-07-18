import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type FTPConstructorParams = {
  name: string;
  uri: string;
};

export class FTP extends DataSet {
  private readonly _name: string;

  private readonly _uri: string;

  private constructor(params: FTPConstructorParams) {
    super();
    this._name = params.name;
    this._uri = params.uri;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.FTP;
  }

  public get fullyQualifiedObjectName(): string {
    return this._uri;
  }

  static create(params: FTPConstructorParams): FTP {
    return new FTP(params);
  }
}
