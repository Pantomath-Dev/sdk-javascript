import { JobTypes } from '@src/enum';
import { Job } from '@src/model/job/job';

export type DBTModelConstructorParams = {
  dbtRootName: string;
  accountId: string;
  packageName: string;
  jobDatabaseName: string;
  jobSchemaName: string;
  jobName: string;
};

export class DBTModelConstructor extends Job {
  private readonly _dbtRootName: string;

  private readonly _accountId: string;

  private readonly _packageName: string;

  private readonly _jobDatabaseName: string;

  private readonly _jobSchemaName: string;

  private readonly _jobName: string;

  private constructor(params: DBTModelConstructorParams) {
    super();
    this._dbtRootName = params.dbtRootName;
    this._accountId = params.accountId;
    this._packageName = params.packageName;
    this._jobDatabaseName = params.jobDatabaseName;
    this._jobSchemaName = params.jobSchemaName;
    this._jobName = params.jobName;
  }

  public get name(): string {
    return `${this._jobName} Model`;
  }

  public get type(): JobTypes {
    return JobTypes.DBT_MODEL;
  }

  get fullyQualifiedObjectName(): string {
    return `${this._dbtRootName}${this._accountId}.${this._packageName}.${this._jobDatabaseName}.${this._jobSchemaName}.${this._jobName}`.toLowerCase();
  }

  static create(params: DBTModelConstructorParams): DBTModelConstructor {
    return new DBTModelConstructor(params);
  }
}
