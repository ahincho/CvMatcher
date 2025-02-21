import { User } from 'src/users/domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { RolePersistenceMapper } from './role.persistence.mapper';

export class UserPersistenceMapper {
  static domainToEntity(user: User) {
    return new UserEntity({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt ? user.createdAt : new Date(),
      updatedAt: user.updatedAt ? user.updatedAt : new Date(),
    });
  }
  static entityToDomain(userEntity: UserEntity) {
    return new User({
      id: userEntity.id,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
      email: userEntity.email,
      password: userEntity.password,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      roles: (userEntity.roles ?? []).map(RolePersistenceMapper.entityToDomain),
    });
  }
}
