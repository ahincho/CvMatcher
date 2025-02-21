import { Role } from 'src/users/domain/models/role.model';

export interface FindOneRoleUseCase {
  execute(roleId: number): Promise<Role>;
}
