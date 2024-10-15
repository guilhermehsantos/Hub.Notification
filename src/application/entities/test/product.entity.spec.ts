import { ProductEntity } from '../../entities/product.entity';
import { EStatus } from '../../common/enums/status';

describe('ProductEntity', () => {
  let product: ProductEntity;

  const mockProductPayload = {
    name: 'Product Name',
    key: 'product-key',
    deleted: false,
    status: EStatus.ACTIVE,
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    product = new ProductEntity('1', mockProductPayload);
  });

  it('should initialize with correct values', () => {
    expect(product.id).toBe('1');
    expect(product.getName()).toBe('Product Name');
    expect(product.getKey()).toBe('product-key');
    expect(product.getDeleted()).toBe(false);
    expect(product.getStatus()).toBe(EStatus.ACTIVE);
    expect(product.getUpdatedAt()).toEqual(new Date('2023-01-01'));
    expect(product.getCreatedAt()).toBeInstanceOf(Date);
  });

  it('should set name correctly', () => {
    product.setName('New Product Name');
    expect(product.getName()).toBe('New Product Name');
  });

  it('should set key correctly', () => {
    product.setKey('new-product-key');
    expect(product.getKey()).toBe('new-product-key');
  });

  it('should set deleted status correctly', () => {
    product.setDeleted(true);
    expect(product.getDeleted()).toBe(true);
  });

  it('should set status correctly', () => {
    product.setStatus(EStatus.INACTIVE);
    expect(product.getStatus()).toBe(EStatus.INACTIVE);
  });

  it('should set updatedAt correctly', () => {
    const newDate = new Date('2023-02-02');
    product.setUpdatedAt(newDate);
    expect(product.getUpdatedAt()).toEqual(newDate);
  });

  it('should set createdAt correctly', () => {
    const newDate = new Date('2023-02-02');
    product.setCreatedAt(newDate);
    expect(product.getCreatedAt()).toEqual(newDate);
  });
});
