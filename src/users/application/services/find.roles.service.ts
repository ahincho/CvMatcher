import { Inject, Injectable } from '@nestjs/common';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { RoleFilters } from 'src/users/domain/models/role.filters.model';
import { Role } from 'src/users/domain/models/role.model';
import { FindRolesUseCase } from '../ports/in/find.roles.use.case';
import { RolePersistencePort } from '../ports/out/role.persistence.port';

@Injectable()
export class FindRolesService implements FindRolesUseCase {
  constructor(
    @Inject('RolePersistencePort')
    private readonly rolePersistencePort: RolePersistencePort,
  ) {}
  async execute(roleFilters: RoleFilters): Promise<PageResult<Role>> {
    return await this.rolePersistencePort.findRoles(roleFilters);
  }
}
