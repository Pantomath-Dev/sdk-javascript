import { JobTypes } from '@src/enum';
import { Job } from '@src/model/job/job';

const DBT_ROOT_NAME_DEFAULT = 'cloud.getdbt.com/#/accounts/';

export type DBTJobConstructorParams = {
  accountId: string;
  projectName: string;
  jobId: string;
  name: string;
};

export class DBTJobConstructor extends Job {
  private readonly _accountId: string;

  private readonly _projectName: string;

  private readonly _jobId: string;

  private readonly _name: string;

  private constructor(params: DBTJobConstructorParams) {
    super();
    this._accountId = params.accountId;
    this._projectName = params.projectName;
    this._jobId = params.jobId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobTypes {
    return JobTypes.JOB;
  }

  get fullyQualifiedObjectName(): string {
    return `${DBT_ROOT_NAME_DEFAULT}${this._accountId}.${this._projectName}.${this._name}.${this._jobId}`?.toLowerCase();
  }

  static create(params: DBTJobConstructorParams): DBTJobConstructor {
    return new DBTJobConstructor(params);
  }
}
