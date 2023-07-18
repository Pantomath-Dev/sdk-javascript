import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type PowerBIReportConstructorParams = {
  name: string;
  workspaceId: string;
  reportId: string;
};

export class PowerBIReport extends DataSet {
  private readonly _name: string;

  private readonly _workspaceId: string;

  private readonly _reportId: string;

  private constructor(params: PowerBIReportConstructorParams) {
    super();
    this._name = params.name;
    this._workspaceId = params.workspaceId;
    this._reportId = params.reportId;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): DataSetType {
    return DataSetTypes.POWER_BI_REPORT;
  }

  get fullyQualifiedObjectName(): string {
    return `app.powerbi.com/groups/${this._workspaceId}/reports/${this._reportId}/ReportSection`.toLowerCase();
  }

  static create(params: PowerBIReportConstructorParams): PowerBIReport {
    return new PowerBIReport(params);
  }
}
