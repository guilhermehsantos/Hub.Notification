import { CompanyEntity } from '../../../entities/company.entity';
import { EStatus } from '../../../common/enums/status';
import { randomUUID } from 'crypto';

describe('CompanyEntity', () => {
  let companyEntity: CompanyEntity;
  const id = randomUUID();
  const props = {
    name: 'Test Company',
    companyRegistrationNumber: '12345678000195',
    createdAt: new Date('2023-01-01'),
    status: EStatus.ACTIVE,
    deleted: false,
    default: 1,
  };

  beforeEach(() => {
    companyEntity = new CompanyEntity(id, props);
  });

  it('should create a CompanyEntity with the given id and props', () => {
    expect(companyEntity.getId()).toBe(id);
    expect(companyEntity.getName()).toBe(props.name);
    expect(companyEntity.getCompanyRegistrationNumber()).toBe(
      props.companyRegistrationNumber,
    );
    expect(companyEntity.getCreatedAt()).toEqual(props.createdAt);
    expect(companyEntity.getStatus()).toBe(props.status);
    expect(companyEntity.getDeleted()).toBe(props.deleted);
    expect(companyEntity.getDefault()).toBe(props.default);
  });

  it('should generate a new UUID if no id is provided', () => {
    const newCompanyEntity = new CompanyEntity('', props);
    expect(newCompanyEntity.getId()).toBeDefined();
    expect(newCompanyEntity.getId()).not.toBe(id);
  });

  it('should set and get the name correctly', () => {
    const newName = 'Updated Company';
    companyEntity.setName(newName);
    expect(companyEntity.getName()).toBe(newName);
  });

  it('should set and get the CNPJ correctly', () => {
    const newCnpj = '98765432000195';
    companyEntity.setCompanyRegistrationNumber(newCnpj);
    expect(companyEntity.getCompanyRegistrationNumber()).toBe(newCnpj);
  });

  it('should set and get the createdAt date correctly', () => {
    const newCreatedAt = new Date('2024-01-01');
    companyEntity.setCreatedAt(newCreatedAt);
    expect(companyEntity.getCreatedAt()).toEqual(newCreatedAt);
  });

  it('should set and get the status correctly', () => {
    const newStatus = EStatus.INACTIVE;
    companyEntity.setStatus(newStatus);
    expect(companyEntity.getStatus()).toBe(newStatus);
  });

  it('should set and get the deleted flag correctly', () => {
    const newDeleted = true;
    companyEntity.setDeleted(newDeleted);
    expect(companyEntity.getDeleted()).toBe(newDeleted);
  });

  it('should set and get the default flag correctly', () => {
    const newDefault = 0;
    companyEntity.setDefault(newDefault);
    expect(companyEntity.getDefault()).toBe(newDefault);
  });
});
