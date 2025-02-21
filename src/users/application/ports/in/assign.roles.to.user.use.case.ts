import { User } from 'src/users/domain/models/user.model';

export interface AssignRolesToUserUseCase {
  execute(userId: number, roleIds: number[]): Promise<User>;
}
