import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/models/user.model';
import { UserNotFoundException } from 'src/users/domain/exceptions/user.not.found.exception';
import { RoleNotFoundException } from 'src/users/domain/exceptions/role.not.found.exception';
import { AssignRolesToUserUseCase } from '../ports/in/assign.roles.to.user.use.case';
import { UserPersistencePort } from '../ports/out/user.persistence.port';
import { RolePersistencePort } from '../ports/out/role.persistence.port';

@Injectable()
export class AssignRolesToUserService implements AssignRolesToUserUseCase {
  constructor(
    @Inject('UserPersistencePort')
    private readonly userPersistencePort: UserPersistencePort,
    @Inject('RolePersistencePort')
    private readonly rolePersistencePort: RolePersistencePort,
  ) {}
  async execute(userId: number, roleIds: number[]): Promise<User> {
    const userOptional = await this.userPersistencePort.findOneUserById(userId);
    if (userOptional.isEmpty()) {
      throw new UserNotFoundException(`User with id '${userId}' not found`);
    }
    const roles = await this.rolePersistencePort.findRolesByIds(roleIds);
    const foundRoleIds = roles.map((role) => role.id);
    const missingRoleIds = roleIds.filter((id) => !foundRoleIds.includes(id));
    if (missingRoleIds.length > 0) {
      throw new RoleNotFoundException(
        `Roles id's not found: ${missingRoleIds.join(', ')}`,
      );
    }
    return await this.userPersistencePort.assignRolesToUser(userId, roleIds);
  }
}
