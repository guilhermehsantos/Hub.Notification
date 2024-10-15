import { ProductGateway } from '../product-gateway';
import { ProductEntity } from '../../../entities/product.entity';
import { EStatus } from '../../../common/enums/status';

describe('ProductGateway', () => {
  let productGateway: ProductGateway;

  beforeEach(() => {
    productGateway = {
      findByParams: jest.fn(),
    } as unknown as ProductGateway;
  });

  it('should return the product when a product exists with the given key and status', async () => {
    const mockKey = 'productKey123';
    const mockStatus = EStatus.ACTIVE;
    const mockProductEntity = new ProductEntity('1', {
      name: 'Product 1',
      key: mockKey,
      status: mockStatus,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (productGateway.findByParams as jest.Mock).mockResolvedValue(
      mockProductEntity,
    );

    const result = await productGateway.findByParams(mockKey, mockStatus);

    expect(productGateway.findByParams).toHaveBeenCalledWith(
      mockKey,
      mockStatus,
    );
    expect(result).toEqual(mockProductEntity);
  });

  it('should return null when no product exists with the given key and status', async () => {
    const mockKey = 'nonExistentKey';
    const mockStatus = EStatus.ACTIVE;

    (productGateway.findByParams as jest.Mock).mockResolvedValue(null);

    const result = await productGateway.findByParams(mockKey, mockStatus);

    expect(productGateway.findByParams).toHaveBeenCalledWith(
      mockKey,
      mockStatus,
    );
    expect(result).toBeNull();
  });
});
