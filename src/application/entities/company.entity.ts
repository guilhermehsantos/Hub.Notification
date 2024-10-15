import { IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace';
import { EStatus } from '../common/enums/status';

export interface CompanyPayload {
  name: string;
  companyRegistrationNumber: string;
  createdAt: Date;
  status: EStatus;
  deleted: boolean;
  default: number;
}

export class CompanyEntity {
  @IsString()
  private _id: string;
  private props: CompanyPayload;

  constructor(
    id: string,
    props: Replace<CompanyPayload, { createdAt?: Date }>,
  ) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    Object.assign(this, props);
  }

  public getId() {
    return this._id;
  }

  public getName(): string {
    return this.props.name;
  }

  public getCompanyRegistrationNumber(): string {
    return this.props.companyRegistrationNumber;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getStatus(): EStatus {
    return this.props.status;
  }

  public getDeleted(): boolean {
    return this.props.deleted;
  }

  public getDefault(): number {
    return this.props.default;
  }

  public setName(value: string): void {
    this.props.name = value;
  }

  public setCompanyRegistrationNumber(value: string): void {
    this.props.companyRegistrationNumber = value;
  }

  public setCreatedAt(value: Date): void {
    this.props.createdAt = value;
  }

  public setStatus(value: EStatus): void {
    this.props.status = value;
  }

  public setDeleted(value: boolean): void {
    this.props.deleted = value;
  }

  public setDefault(value: number): void {
    this.props.default = value;
  }
}
