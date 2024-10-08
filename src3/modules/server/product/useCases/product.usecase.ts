import { Injectable } from '@nestjs/common';
import { IProductGateway } from '../interfaces/IProductGateway';
import { Status } from 'src3/core/common/enums/status';
import { Exception } from 'src3/core/common/exception/Exception';
import { Code } from 'src3/core/common/code/Code';

@Injectable()
export class ProductUseCase {
  constructor(private _productRepository: IProductGateway) {}

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
