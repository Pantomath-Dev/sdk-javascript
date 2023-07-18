import { JobTypes } from '@src/enum';
import { normalizeHost, sanitizeTableauString } from '@src/util';
import { Job } from '@src/model/job/job';

export type TableauExtractRefreshTaskConstructorParams = {
  name: string;
  host: string;
  siteId: string;
  refreshId: string;
};

export class TableauExtractRefreshTask extends Job {
  private readonly _name: string;

  private readonly _host: string;

  private readonly _siteId: string;

  private readonly _refreshId: string;

  private constructor(params: TableauExtractRefreshTaskConstructorParams) {
    super();
    this._name = params.name;
    this._host = params.host;
    this._siteId = params.siteId;
    this._refreshId = params.refreshId;
  }

  public get name(): string {
    return sanitizeTableauString(this._name);
  }

  public get type(): JobTypes {
    return JobTypes.TABLEAU_EXTRACT_REFRESH_TASK;
  }

  get fullyQualifiedObjectName(): string {
    return `${normalizeHost(this._host)}/site/${this._siteId}/task/${this._refreshId}`.toLowerCase();
  }

  static create(params: TableauExtractRefreshTaskConstructorParams): TableauExtractRefreshTask {
    return new TableauExtractRefreshTask(params);
  }
}
