import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type PowerBIDashboardConstructorParams = {
  name: string;
  workspaceId: string;
  dashboardId: string;
};

export class PowerBIDashboard extends DataSet {
  private readonly _name: string;

  private readonly _workspaceId: string;

  private readonly _dashboardId: string;

  private constructor(params: PowerBIDashboardConstructorParams) {
    super();
    this._name = params.name;
    this._workspaceId = params.workspaceId;
    this._dashboardId = params.dashboardId;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.POWER_BI_DASHBOARD;
  }

  get fullyQualifiedObjectName(): string {
    return `app.powerbi.com/groups/${this._workspaceId}/dashboards/${this._dashboardId}`.toLowerCase();
  }

  static create(params: PowerBIDashboardConstructorParams): PowerBIDashboard {
    return new PowerBIDashboard(params);
  }
}
