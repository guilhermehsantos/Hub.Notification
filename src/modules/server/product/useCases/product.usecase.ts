import { Inject, Injectable } from '@nestjs/common';
import { IProductGateway } from '../interfaces/IProductGateway';
import { Status } from 'src/core/common/enums/status';
import { Exception } from 'src/core/common/exception/Exception';
import { Code } from 'src/core/common/code/Code';

@Injectable()
export class ProductUseCase {
  constructor(
    @Inject('IProductGateway')
    private readonly _productRepository: IProductGateway,
  ) {}

  async findProductByKey(id: string, status: Status) {
    if (!id && !status) {
      throw new Exception(
        Code.VALUE_OBJECT_VALIDATION_ERROR,
        'id and status are required',
      );
    }

    return this._productRepository.findByParams(id, status);
  }
}
