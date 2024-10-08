import { EntityBase } from '../../../../core/common/entities/entity';
import { CompanyPayload } from '../type/CompanyPayload';
import { IsDate, IsString } from 'class-validator';

export class Company extends EntityBase<string> {
  @IsString()
  private name: string;

  @IsString()
  private cnpj: string;

  @IsDate()
  private createdAt: Date;

  @IsString()
  private status: string;

  @IsString()
  private deleted: boolean;

  constructor(props: CompanyPayload) {
    super();
    Object.assign(this, props);
  }

  public getName(): string {
    return this.name;
  }

  public getCnpj(): string {
    return this.cnpj;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getStatus(): string {
    return this.status;
  }

  public getDeleted(): boolean {
    return this.deleted;
  }

  public setName(value: string): void {
    this.name = value;
  }

  public setCnpj(value: string): void {
    this.cnpj = value;
  }

  public setCreatedAt(value: Date): void {
    this.createdAt = value;
  }

  public setStatus(value: string): void {
    this.status = value;
  }

  public setDeleted(value: boolean): void {
    this.deleted = value;
  }
}
