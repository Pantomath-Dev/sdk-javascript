import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type SqlProcedureConstructorParams = {
  host: string;
  port: number;
  database: string;
  schema: string;
  name: string;
};

export class SqlProcedure extends Job {
  private readonly _host: string;

  private readonly _port: number;

  private readonly _database: string;

  private readonly _schema: string;

  private readonly _name: string;

  constructor(params: SqlProcedureConstructorParams) {
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

  public get type(): JobType {
    return JobTypes.SQL_PROCEDURE;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._host}:${this._port}.${this._database}.${this._schema}.${this._name}`;
  }

  static create(params: SqlProcedureConstructorParams): SqlProcedure {
    return new SqlProcedure(params);
  }
}
