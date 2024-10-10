import { Replace } from 'src/helpers/Replace';
import { EStatus } from '../common/enums/status';

export interface ProductPayload {
  name: string;
  key: string;
  deleted: boolean;
  status: EStatus;
  updatedAt: Date;
  createdAt: Date;
}

export class ProductEntity {
  private _id: string;
  private props: ProductPayload;

  constructor(
    id: string,
    props: Replace<ProductPayload, { createdAt?: Date }>,
  ) {
    this._id = id;
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public getName(): string {
    return this.props.name;
  }

  public getKey(): string {
    return this.props.key;
  }

  public getDeleted(): boolean {
    return this.props.deleted;
  }

  public getStatus(): EStatus {
    return this.props.status;
  }

  public getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public setName(value: string): void {
    this.props.name = value;
  }

  public setKey(value: string): void {
    this.props.key = value;
  }

  public setDeleted(value: boolean): void {
    this.props.deleted = value;
  }

  public setStatus(value: EStatus): void {
    this.props.status = value;
  }

  public setUpdatedAt(value: Date): void {
    this.props.updatedAt = value;
  }

  public setCreatedAt(value: Date): void {
    this.props.createdAt = value;
  }
}
