import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optional } from 'src/commons/domain/models/optional.model';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { RolePersistencePort } from 'src/users/application/ports/out/role.persistence.port';
import { Role } from 'src/users/domain/models/role.model';
import { RoleFilters } from 'src/users/domain/models/role.filters.model';
import { RoleEntity } from '../entities/role.entity';
import { RolePersistenceMapper } from '../mappers/role.persistence.mapper';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolePersistenceAdapter implements RolePersistencePort {
  private readonly logger = new Logger(RolePersistenceAdapter.name);
  private readonly roleCacheByName = new Map<string, RoleEntity>();
  private roleList: RoleEntity[] = [];
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}
  async findRoles(roleFilters: RoleFilters): Promise<PageResult<Role>> {
    const currentPage = roleFilters.page.number;
    const pageSize = roleFilters.page.size;
    const totalItems = this.roleList.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const hasNextPage = currentPage < totalPages - 1;
    const items = this.roleList
      .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      .map(RolePersistenceMapper.entityToDomain);
    return new PageResult<Role>({
      totalItems,
      totalPages,
      currentPage,
      pageSize,
      hasNextPage,
      items,
    });
  }
  async findRolesByIds(roleIds: number[]): Promise<Role[]> {
    const rolesFromCache: RoleEntity[] = [];
    const missingRoleIds: number[] = [];
    for (const id of roleIds) {
      const role = this.roleList.find((r) => r.id === id);
      if (role) {
        rolesFromCache.push(role);
      } else {
        missingRoleIds.push(id);
      }
    }
    if (missingRoleIds.length > 0) {
      const rolesFromDB = await this._roleRepository.findBy({
        id: In(missingRoleIds),
      });
      rolesFromDB.forEach((role) => {
        this.roleCacheByName.set(role.name, role);
        this.roleList.push(role);
      });
      rolesFromCache.push(...rolesFromDB);
    }
    return rolesFromCache.map(RolePersistenceMapper.entityToDomain);
  }
  async findOneRoleById(roleId: number): Promise<Optional<Role>> {
    const roleEntity = this.roleList.find((role) => role.id === roleId);
    if (!roleEntity) {
      return Optional.empty<Role>();
    }
    return Optional.of(RolePersistenceMapper.entityToDomain(roleEntity));
  }
  async findOneRoleByName(roleName: string): Promise<Optional<Role>> {
    const roleEntity = this.roleCacheByName.get(roleName);
    if (!roleEntity) {
      return Optional.empty<Role>();
    }
    return Optional.of(RolePersistenceMapper.entityToDomain(roleEntity));
  }
  public async loadRolesToCache(): Promise<void> {
    this.logger.log('Loading roles into cache...');
    const roles = await this._roleRepository.find();
    this.roleCacheByName.clear();
    this.roleList = [];
    roles.forEach((role) => {
      this.roleCacheByName.set(role.name, role);
      this.roleList.push(role);
    });
    this.logger.log(`Loaded ${roles.length} roles into cache`);
  }
}
