import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type SqlMaterializedViewConstructorParams = {
  host: string;
  port: number;
  database: string;
  schema: string;
  name: string;
};

export class SqlMaterializedView extends DataSet {
  private readonly _host: string;

  private readonly _port: number;

  private readonly _database: string;

  private readonly _schema: string;

  private readonly _name: string;

  private constructor(params: SqlMaterializedViewConstructorParams) {
    super();
    this._host = params.host;
    this._port = params.port;
    this._database = params.database;
    this._schema = params.schema;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.SQL_MATERIALIZED_VIEW;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._host}:${this._port}.${this._database}.${this._schema}.${this._name}`;
  }

  static create(params: SqlMaterializedViewConstructorParams): SqlMaterializedView {
    return new SqlMaterializedView(params);
  }
}
