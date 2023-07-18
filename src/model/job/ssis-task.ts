import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type SSISTaskConstructorParams = {
  folderName: string;
  projectName: string;
  parentExecutableName: string;
  executableName: string;
  name: string;
};

export class SSISTask extends Job {
  private readonly _folderName: string;

  private readonly _projectName: string;

  private readonly _parentExecutableName: string;

  private readonly _executableName: string;

  constructor(params: SSISTaskConstructorParams) {
    super();
    this._folderName = params.folderName;
    this._projectName = params.projectName;
    this._parentExecutableName = params.parentExecutableName;
    this._executableName = params.executableName;
  }

  public get name(): string {
    return this._executableName;
  }

  public get type(): JobType {
    return JobTypes.TASK;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._folderName}.${this._projectName}.${this._parentExecutableName}.${this._executableName}`.toLowerCase();
  }

  static create(params: SSISTaskConstructorParams): SSISTask {
    return new SSISTask(params);
  }
}
