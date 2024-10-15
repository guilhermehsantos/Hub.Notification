import { GetProductByKey } from '../get-product-by-key';
import { ProductGateway } from '../../../gateways/db/product-gateway';
import { ProductEntity } from '../../../entities/product.entity';
import { EStatus } from '../../../common/enums/status';

describe('GetProductByKey', () => {
  let getProductByKey: GetProductByKey;
  let productGateway: ProductGateway;

  beforeEach(() => {
    productGateway = {
      findByParams: jest.fn(),
    } as any;

    getProductByKey = new GetProductByKey(productGateway);
  });

  it('deve retornar o produto quando encontrado', async () => {
    const mockProductProps = {
      name: 'Produto Teste',
      key: 'prod123',
      deleted: false,
      status: EStatus.ACTIVE,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    const mockProduct = new ProductEntity('1', mockProductProps);

    (productGateway.findByParams as jest.Mock).mockResolvedValue(mockProduct);

    const key = 'prod123';
    const result = await getProductByKey.execute(key);
    expect(result).toEqual(mockProduct);
    expect(productGateway.findByParams).toHaveBeenCalledWith(
      key,
      EStatus.ACTIVE,
    );

    expect(result.getKey()).toBe('prod123');
    expect(result.getName()).toBe('Produto Teste');
    expect(result.getStatus()).toBe(EStatus.ACTIVE);
    expect(result.getDeleted()).toBe(false);
  });

  it('deve retornar null quando o produto não for encontrado', async () => {
    (productGateway.findByParams as jest.Mock).mockResolvedValue(null);

    const key = 'prod999';
    const result = await getProductByKey.execute(key);
    expect(result).toBeNull();
    expect(productGateway.findByParams).toHaveBeenCalledWith(
      key,
      EStatus.ACTIVE,
    );
  });
});
