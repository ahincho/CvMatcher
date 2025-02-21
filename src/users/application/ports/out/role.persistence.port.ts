import { Optional } from 'src/commons/domain/models/optional.model';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { RoleFilters } from 'src/users/domain/models/role.filters.model';
import { Role } from 'src/users/domain/models/role.model';

export interface RolePersistencePort {
  findRoles(roleFilters: RoleFilters): Promise<PageResult<Role>>;
  findRolesByIds(roleIds: number[]): Promise<Role[]>;
  findOneRoleById(roleId: number): Promise<Optional<Role>>;
  findOneRoleByName(name: string): Promise<Optional<Role>>;
  loadRolesToCache(): Promise<void>;
}
