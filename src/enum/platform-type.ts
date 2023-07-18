export enum PlatformTypes {
  FIVETRAN = 'FIVETRAN',
  SNOWFLAKE = 'SNOWFLAKE',
  TABLEAU = 'TABLEAU',
  UNKNOWN = 'UNKNOWN',
  DBT = 'DBT',
  IBM_DATASTAGE = 'IBM_DATASTAGE',
  ADF = 'ADF',
  POWERBI = 'POWERBI',
  SSIS = 'SSIS',
  SYNAPSE = 'SYNAPSE',
  SSRS = 'SSRS',
  SQL_SERVER = 'SQL_SERVER',
  DBX = 'DBX',
  AWS = 'AWS',
  INFORMATICA = 'INFORMATICA',
  PBIRS = 'PBIRS',
  EXTERNAL = 'EXTERNAL',
  AZSTORAGE = 'AZSTORAGE',
  ORACLE = 'ORACLE',
  DATAPROC = 'DATAPROC',
  BIGQUERY = 'BIGQUERY',
  COMPOSER = 'COMPOSER',
  CUSTOM_LOGS = 'CUSTOM_LOGS'
}

export function getPlatformTypes(): string[] {
  return Object.keys(PlatformTypes);
}

export type PlatformType =
  | 'FIVETRAN'
  | 'SNOWFLAKE'
  | 'TABLEAU'
  | 'UNKNOWN'
  | 'DBT'
  | 'IBM_DATASTAGE'
  | 'ADF'
  | 'POWERBI'
  | 'SSIS'
  | 'SYNAPSE'
  | 'SSRS'
  | 'SQL_SERVER'
  | 'DBX'
  | 'AWS'
  | 'INFORMATICA'
  | 'PBIRS'
  | 'EXTERNAL'
  | 'AZSTORAGE'
  | 'ORACLE'
  | 'DATAPROC'
  | 'BIGQUERY'
  | 'COMPOSER'
  | 'CUSTOM_LOGS';

export function isPlatformType(input: string): input is PlatformType {
  return Object.keys(PlatformTypes).includes(input);
}
