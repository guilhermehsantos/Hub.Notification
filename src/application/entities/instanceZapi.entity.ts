import { Replace } from '../../helpers/Replace';
import { EStatus } from '../common/enums/status';

export interface InstanceZapiPayload {
  phoneNumberId: string;
  token: string;
  code: string | null;
  type: number;
  status: EStatus;
  createdBy: string;
  createdAt: Date;
  deleted: boolean;
  clientToken: string;
}

export class InstanceZapiEntity {
  private _id: string;
  private props: InstanceZapiPayload;

  constructor(
    id: string,
    props: Replace<InstanceZapiPayload, { createdAt?: Date }>,
  ) {
    this._id = id;
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  // Getters
  public get id(): string {
    return this._id;
  }

  public getPhoneNumberId(): string {
    return this.props.phoneNumberId;
  }

  public getToken(): string {
    return this.props.token;
  }

  public getCode(): string | null {
    return this.props.code;
  }

  public getType(): number {
    return this.props.type;
  }

  public getStatus(): EStatus {
    return this.props.status;
  }

  public getCreatedBy(): string {
    return this.props.createdBy;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getDeleted(): boolean {
    return this.props.deleted;
  }

  public getClientToken(): string {
    return this.props.clientToken;
  }

  // Setters
  public setPhoneNumberId(value: string): void {
    this.props.phoneNumberId = value;
  }

  public setToken(value: string): void {
    this.props.token = value;
  }

  public setCode(value: string | null): void {
    this.props.code = value;
  }

  public setType(value: number): void {
    this.props.type = value;
  }

  public setStatus(value: EStatus): void {
    this.props.status = value;
  }

  public setCreatedBy(value: string): void {
    this.props.createdBy = value;
  }

  public setCreatedAt(value: Date): void {
    this.props.createdAt = value;
  }

  public setDeleted(value: boolean): void {
    this.props.deleted = value;
  }

  public setClientToken(value: string): void {
    this.props.clientToken = value;
  }

  // Methods
  public markAsDeleted(): void {
    this.props.deleted = true;
  }
}
