import { InstanceZapiEntity } from '../../../entities/instanceZapi.entity';
import { EStatus } from '../../../common/enums/status';
import { randomUUID } from 'crypto';

describe('InstanceZapiEntity', () => {
  let instanceZapiEntity: InstanceZapiEntity;
  const id = randomUUID();
  const props = {
    phoneNumberId: '1234567890',
    token: 'token123',
    code: 'ABC123',
    type: 1,
    status: EStatus.ACTIVE,
    createdBy: 'test_user',
    createdAt: new Date('2023-01-01'),
    deleted: false,
  };

  beforeEach(() => {
    instanceZapiEntity = new InstanceZapiEntity(id, props);
  });

  it('should create an InstanceZapiEntity with the given id and props', () => {
    expect(instanceZapiEntity.id).toBe(id);
    expect(instanceZapiEntity.getPhoneNumberId()).toBe(props.phoneNumberId);
    expect(instanceZapiEntity.getToken()).toBe(props.token);
    expect(instanceZapiEntity.getCode()).toBe(props.code);
    expect(instanceZapiEntity.getType()).toBe(props.type);
    expect(instanceZapiEntity.getStatus()).toBe(props.status);
    expect(instanceZapiEntity.getCreatedBy()).toBe(props.createdBy);
    expect(instanceZapiEntity.getCreatedAt()).toEqual(props.createdAt);
    expect(instanceZapiEntity.getDeleted()).toBe(props.deleted);
  });

  it('should generate a new UUID if no id is provided', () => {
    const newInstanceZapiEntity = new InstanceZapiEntity('', props);
    expect(newInstanceZapiEntity.id).toBeDefined();
    expect(newInstanceZapiEntity.id).not.toBe(id);
  });

  it('should set and get the phoneNumberId correctly', () => {
    const newPhoneNumberId = '9876543210';
    instanceZapiEntity.setPhoneNumberId(newPhoneNumberId);
    expect(instanceZapiEntity.getPhoneNumberId()).toBe(newPhoneNumberId);
  });

  it('should set and get the token correctly', () => {
    const newToken = 'newToken123';
    instanceZapiEntity.setToken(newToken);
    expect(instanceZapiEntity.getToken()).toBe(newToken);
  });

  it('should set and get the code correctly', () => {
    const newCode = 'XYZ789';
    instanceZapiEntity.setCode(newCode);
    expect(instanceZapiEntity.getCode()).toBe(newCode);
  });

  it('should set and get the type correctly', () => {
    const newType = 2;
    instanceZapiEntity.setType(newType);
    expect(instanceZapiEntity.getType()).toBe(newType);
  });

  it('should set and get the status correctly', () => {
    const newStatus = EStatus.INACTIVE;
    instanceZapiEntity.setStatus(newStatus);
    expect(instanceZapiEntity.getStatus()).toBe(newStatus);
  });

  it('should set and get the createdBy correctly', () => {
    const newCreatedBy = 'new_user';
    instanceZapiEntity.setCreatedBy(newCreatedBy);
    expect(instanceZapiEntity.getCreatedBy()).toBe(newCreatedBy);
  });

  it('should set and get the createdAt date correctly', () => {
    const newCreatedAt = new Date('2024-01-01');
    instanceZapiEntity.setCreatedAt(newCreatedAt);
    expect(instanceZapiEntity.getCreatedAt()).toEqual(newCreatedAt);
  });

  it('should set and get the deleted flag correctly', () => {
    const newDeleted = true;
    instanceZapiEntity.setDeleted(newDeleted);
    expect(instanceZapiEntity.getDeleted()).toBe(newDeleted);
  });

  it('should mark the entity as deleted', () => {
    instanceZapiEntity.markAsDeleted();
    expect(instanceZapiEntity.getDeleted()).toBe(true);
  });
});
