import { JobTypes } from '@src/enum';
import { Job } from '@src/model/job/job';

export type FivetranConnectorConstructorParams = {
  name: string;
};

export class FivetranConnectorConstructor extends Job {
  private readonly _name: string;

  private constructor(params: FivetranConnectorConstructorParams) {
    super();
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobTypes {
    return JobTypes.FIVETRAN_CONNECTOR;
  }

  get fullyQualifiedObjectName(): string {
    return this._name;
  }

  static create(params: FivetranConnectorConstructorParams): FivetranConnectorConstructor {
    return new FivetranConnectorConstructor(params);
  }
}
