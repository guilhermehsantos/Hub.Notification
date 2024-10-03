import { Product } from '../../../../infra/db/typeORM/entities/product';
// import { Status } from '../../../../core/common/enums/status';

export interface IProductGateway {
  findByParams(id: string, status: number): Promise<Product | null>;
}
