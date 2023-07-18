import { DataSet } from '@src/model/dataset/dataset';
import { DataSetType, DataSetTypes } from '@src/enum';

export type S3BucketConstructorParams = {
  s3Bucket: string;
};

export class S3Bucket extends DataSet {
  private readonly _s3Bucket: string;

  private constructor(params: S3BucketConstructorParams) {
    super();
    this._s3Bucket = params.s3Bucket;
  }

  public get name(): string {
    return this._s3Bucket;
  }

  public get type(): DataSetType {
    return DataSetTypes.S3_BUCKET;
  }

  public get fullyQualifiedObjectName(): string {
    return this._s3Bucket;
  }

  static create(params: S3BucketConstructorParams): S3Bucket {
    return new S3Bucket(params);
  }
}
