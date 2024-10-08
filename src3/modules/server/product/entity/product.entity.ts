import { Status } from 'src3/core/common/enums/status';

export class ProductEntity {
  id: string;
  name: string;
  key: string;
  deleted: boolean;
  status: Status;
  updatedAt: Date;
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    key: string,
    deleted: boolean,
    status: Status,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.deleted = deleted;
    this.status = status;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
