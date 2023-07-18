import { Job } from '@src/model/job/job';
import { JobType, JobTypes } from '@src/enum';
import { normalizeHost } from '@src/util';

export type PowerBIRefreshConstructorParams = {
  refreshScheduleContext: string;
  datasetId: string;
  name: string;
};

export class PowerBIRefresh extends Job {
  private readonly _refreshScheduleContext: string;

  private readonly _datasetId: string;

  private readonly _name: string;

  constructor(params: PowerBIRefreshConstructorParams) {
    super();
    this._refreshScheduleContext = params.refreshScheduleContext;
    this._datasetId = params.datasetId;
    this._name = params.name;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): JobType {
    return JobTypes.POWER_BI_REFRESH;
  }

  public get fullyQualifiedObjectName(): string {
    let refreshFQN = `${this._refreshScheduleContext}/${this._datasetId}/${this._name}`;
    refreshFQN = refreshFQN.split(' ').join('_');
    return `${normalizeHost(refreshFQN)}`.toLowerCase();
  }

  static create(params: PowerBIRefreshConstructorParams): PowerBIRefresh {
    return new PowerBIRefresh(params);
  }
}
