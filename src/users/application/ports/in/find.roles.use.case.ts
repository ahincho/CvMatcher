import { PageResult } from 'src/commons/domain/models/page.result.model';
import { RoleFilters } from 'src/users/domain/models/role.filters.model';
import { Role } from 'src/users/domain/models/role.model';

export interface FindRolesUseCase {
  execute(roleFilters: RoleFilters): Promise<PageResult<Role>>;
}
