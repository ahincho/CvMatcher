import { Role } from 'src/users/domain/models/role.model';
import { RoleEntity } from '../entities/role.entity';

export class RolePersistenceMapper {
  static domainToEntity(role: Role): RoleEntity {
    return new RoleEntity({
      id: role.id,
      name: role.name,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    });
  }
  static entityToDomain(roleEntity: RoleEntity): Role {
    return new Role({
      id: roleEntity.id,
      name: roleEntity.name,
      createdAt: roleEntity.createdAt,
      updatedAt: roleEntity.updatedAt,
    });
  }
}
