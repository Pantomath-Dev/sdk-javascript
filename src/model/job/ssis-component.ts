import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';

export type SSISComponentConstructorParams = {
  folderName: string;
  projectName: string;
  executionPath: string;
  name: string;
};

export class SSISComponent extends Job {
  private readonly _folderName: string;

  private readonly _projectName: string;

  private readonly _executionPath: string;

  private readonly _name: string;

  constructor(params: SSISComponentConstructorParams) {
    super();
    this._folderName = params.folderName;
    this._projectName = params.projectName;
    this._executionPath = params.executionPath;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.COMPONENT;
  }

  public get fullyQualifiedObjectName(): string {
    return `${this._folderName}.${this._projectName}.${this._executionPath}.${this._name}`.toLowerCase();
  }

  static create(params: SSISComponentConstructorParams): SSISComponent {
    return new SSISComponent(params);
  }
}
