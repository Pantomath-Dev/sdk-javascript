import { DataSetType } from '@src/enum';

export abstract class DataSet {
  abstract get name(): string;

  abstract get type(): DataSetType;

  abstract get fullyQualifiedObjectName(): string;
}
