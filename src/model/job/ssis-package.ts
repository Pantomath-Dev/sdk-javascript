import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type SSISPackageConstructorParams = {
  folderName: string;
  projectName: string;
  name: string;
};

export class SSISPackage extends Job {
  private readonly _folderName: string;

  private readonly _projectName: string;

  private readonly _name: string;

  constructor(params: SSISPackageConstructorParams) {
    super();
    this._folderName = params.folderName;
    this._projectName = params.projectName;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.PACKAGE;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._folderName}.${this._projectName}.${this._name}`.toLowerCase();
  }

  static create(params: SSISPackageConstructorParams): SSISPackage {
    return new SSISPackage(params);
  }
}
