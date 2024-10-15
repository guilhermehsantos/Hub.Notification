import { InstanceZapiEntity } from 'src/application/entities/instanceZapi.entity';
import { InstanceZAPI } from '../entities/instanceZAPI';

export class InstanceZapiMapper {
  static toEntity(instanceZapi: InstanceZAPI): InstanceZapiEntity {
    return new InstanceZapiEntity(instanceZapi.id, {
      code: instanceZapi.code,
      token: instanceZapi.token,
      deleted: instanceZapi.deleted,
      status: instanceZapi.status,
      createdBy: instanceZapi.createdBy,
      createdAt: instanceZapi.createdAt,
      phoneNumberId: instanceZapi.phoneNumberId,
      type: instanceZapi.type,
      clientToken: instanceZapi.clientToken,
    });
  }

  static toPersistence(instanceZapi: InstanceZapiEntity): InstanceZAPI {
    return {
      id: instanceZapi.id,
      phoneNumberId: instanceZapi.getPhoneNumberId(),
      status: instanceZapi.getStatus(),
      code: instanceZapi.getCode(),
      deleted: instanceZapi.getDeleted(),
      createdBy: instanceZapi.getCreatedBy(),
      createdAt: instanceZapi.getCreatedAt(),
      type: instanceZapi.getType(),
      token: instanceZapi.getToken(),
      clientToken: instanceZapi.getClientToken(),
    };
  }
}
