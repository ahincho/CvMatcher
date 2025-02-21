import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optional } from 'src/commons/domain/models/optional.model';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { UserNotFoundException } from 'src/users/domain/exceptions/user.not.found.exception';
import { RoleNotFoundException } from 'src/users/domain/exceptions/role.not.found.exception';
import { User } from 'src/users/domain/models/user.model';
import { UserFilters } from 'src/users/domain/models/user.filters.model';
import { UserPersistencePort } from 'src/users/application/ports/out/user.persistence.port';
import { RolePersistencePort } from 'src/users/application/ports/out/role.persistence.port';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserPersistenceMapper } from '../mappers/user.persistence.mapper';
import { RolePersistenceMapper } from '../mappers/role.persistence.mapper';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPersistenceAdapter implements UserPersistencePort {
  private standardRole: RoleEntity | null = null;
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    @Inject('RolePersistencePort')
    private readonly _rolePersistencePort: RolePersistencePort,
  ) {}
  async createOneUser(user: User): Promise<User> {
    if (!this.standardRole) {
      const roleOptional =
        await this._rolePersistencePort.findOneRoleByName('Standard');
      if (roleOptional.isEmpty()) {
        throw new RoleNotFoundException(`Role with name 'Standard' not found`);
      }
      this.standardRole = RolePersistenceMapper.domainToEntity(
        roleOptional.get(),
      );
    }
    user.password = await bcrypt.hash(user.password, 10);
    const userEntity = UserPersistenceMapper.domainToEntity(user);
    userEntity.roles = [this.standardRole];
    const savedUser = await this._userRepository.save(userEntity);
    return UserPersistenceMapper.entityToDomain(savedUser);
  }
  async assignRolesToUser(userId: number, roleIds: number[]): Promise<User> {
    const userEntity = await this._userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :id', { id: userId })
      .getOne();
    if (!userEntity) {
      throw new UserNotFoundException(`User with id '${userId}' not found`);
    }
    const existingRoles = userEntity.roles.map((role) => role.id);
    const allRoleIds = Array.from(new Set([...existingRoles, ...roleIds]));
    const roles = await this._rolePersistencePort.findRolesByIds(allRoleIds);
    userEntity.roles = roles.map(RolePersistenceMapper.domainToEntity);
    const updatedUser = await this._userRepository.save(userEntity);
    return UserPersistenceMapper.entityToDomain(updatedUser);
  }
  async findUsers(userFilters: UserFilters): Promise<PageResult<User>> {
    const currentPage = userFilters.page.number;
    const pageSize = userFilters.page.size;
    const totalItems = await this._userRepository
      .createQueryBuilder('user')
      .getCount();
    const users = await this._userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .skip(currentPage * pageSize)
      .take(pageSize)
      .getMany();
    const totalPages = Math.ceil(Number(totalItems) / pageSize);
    const hasNextPage = currentPage < totalPages - 1;
    const items = users.map(UserPersistenceMapper.entityToDomain);
    return new PageResult<User>({
      totalItems,
      totalPages,
      currentPage,
      pageSize,
      hasNextPage,
      items,
    });
  }
  async findOneUserById(userId: number): Promise<Optional<User>> {
    const userEntity = await this._userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :id', { id: userId })
      .getOne();
    if (!userEntity) {
      return Optional.empty<User>();
    }
    return Optional.of(UserPersistenceMapper.entityToDomain(userEntity));
  }
  async findOneUserByEmail(email: string): Promise<Optional<User>> {
    const userEntity = await this._userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.email = :email', { email: email })
      .getOne();
    if (!userEntity) {
      return Optional.empty<User>();
    }
    return Optional.of(UserPersistenceMapper.entityToDomain(userEntity));
  }
  async existsOneUserById(userId: number): Promise<boolean> {
    return this._userRepository.exists({ where: { id: userId } });
  }
  async existsOneUserByEmail(email: string): Promise<boolean> {
    return this._userRepository.exists({ where: { email: email } });
  }
  async updateOneUserById(userId: number, user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async deleteOneUserById(userId: number): Promise<void> {
    await this._userRepository.delete(userId);
  }
}
