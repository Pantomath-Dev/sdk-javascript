import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';
import { normalizeHost, sanitizeTableauString } from '@src/util';

export type TableauDatasourceConstructorParams = {
  name: string;
  host: string;
  uri: string;
};

export class TableauDatasource extends DataSet {
  private readonly _name: string;

  private readonly _host: string;

  private readonly _uri: string;

  private constructor(params: TableauDatasourceConstructorParams) {
    super();
    this._name = params.name;
    this._host = params.host;
    this._uri = params.uri;
  }

  public get name(): string {
    return sanitizeTableauString(this._name);
  }

  public get type(): DataSetType {
    return DataSetTypes.TABLEAU_DATASOURCE;
  }

  get fullyQualifiedObjectName(): string {
    return `${normalizeHost(this._host)}/${this._uri}`.toLowerCase();
  }

  static create(params: TableauDatasourceConstructorParams): TableauDatasource {
    return new TableauDatasource(params);
  }
}
