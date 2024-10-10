import { Replace } from 'src/helpers/Replace';
import { EStatus } from '../common/enums/status';

export interface MessageTemplatePayload {
  companyId?: string;
  name: string;
  status: EStatus;
  description?: string;
  body: string;
  provider: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class MessageTemplateEntity {
  private _id: string;
  private props: MessageTemplatePayload;

  constructor(
    id: string,
    props: Replace<MessageTemplatePayload, { companyId?: string }>,
  ) {
    this._id = id;
    this.props = {
      ...props,
      companyId: props.companyId || '',
      createdAt: props.createdAt || new Date(),
    };
  }

  getId(): string {
    return this._id;
  }

  getCompanyId(): string {
    return this.props.companyId;
  }

  getName(): string {
    return this.props.name;
  }

  getStatus(): number {
    return this.props.status;
  }

  getDescription(): string | undefined {
    return this.props.description;
  }

  getBody(): string {
    return this.props.body;
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  getProvider(): number {
    return this.props.provider;
  }

  isDeleted(): boolean {
    return this.props.deleted;
  }

  // Métodos para modificar os valores das propriedades
  updateName(newName: string): void {
    this.props.name = newName;
    this.updateTimestamp();
  }

  updateStatus(newStatus: number): void {
    this.props.status = newStatus;
    this.updateTimestamp();
  }

  updateDescription(newDescription: string): void {
    this.props.description = newDescription;
    this.updateTimestamp();
  }

  updateBody(newBody: string): void {
    this.props.body = newBody;
    this.updateTimestamp();
  }

  markAsDeleted(): void {
    this.props.deleted = true;
    this.updateTimestamp();
  }

  private updateTimestamp(): void {
    this.props.updatedAt = new Date();
  }
}
