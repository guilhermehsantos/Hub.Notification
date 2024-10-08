import { IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

export interface CompanyPayload {
  name: string;
  cnpj: string;
  createdAt: Date;
  status: string;
  deleted: boolean;
}

export class CompanyEntity {
  @IsString()
  private _id: string;
  private props: CompanyPayload;

  constructor(
    props: Replace<CompanyPayload, { CreatedAt?: Date }>,
    id: string,
  ) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    Object.assign(this, props);
  }

  public get id() {
    return this._id;
  }

  public getName(): string {
    return this.props.name;
  }

  public getCnpj(): string {
    return this.props.cnpj;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getStatus(): string {
    return this.props.status;
  }

  public getDeleted(): boolean {
    return this.props.deleted;
  }

  public setName(value: string): void {
    this.props.name = value;
  }

  public setCnpj(value: string): void {
    this.props.cnpj = value;
  }

  public setCreatedAt(value: Date): void {
    this.props.createdAt = value;
  }

  public setStatus(value: string): void {
    this.props.status = value;
  }

  public setDeleted(value: boolean): void {
    this.props.deleted = value;
  }
}
