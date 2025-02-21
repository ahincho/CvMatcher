import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/users/domain/models/role.model';
import { RoleNotFoundException } from 'src/users/domain/exceptions/role.not.found.exception';
import { FindOneRoleUseCase } from '../ports/in/find.one.role.use.case';
import { RolePersistencePort } from '../ports/out/role.persistence.port';

@Injectable()
export class FindOneRoleService implements FindOneRoleUseCase {
  constructor(
    @Inject('RolePersistencePort')
    private readonly rolePersistencePort: RolePersistencePort,
  ) {}
  async execute(roleId: number): Promise<Role> {
    const optionalRole = await this.rolePersistencePort.findOneRoleById(roleId);
    if (optionalRole.isEmpty()) {
      throw new RoleNotFoundException(`Role with id '${roleId}' not found`);
    }
    return optionalRole.get();
  }
}
