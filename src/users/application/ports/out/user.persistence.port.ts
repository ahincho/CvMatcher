import { Optional } from 'src/commons/domain/models/optional.model';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { UserFilters } from 'src/users/domain/models/user.filters.model';
import { User } from 'src/users/domain/models/user.model';

export interface UserPersistencePort {
  createOneUser(user: User): Promise<User>;
  assignRolesToUser(userId: number, roleIds: number[]): Promise<User>;
  findUsers(userFilters: UserFilters): Promise<PageResult<User>>;
  findOneUserById(userId: number): Promise<Optional<User>>;
  findOneUserByEmail(email: string): Promise<Optional<User>>;
  existsOneUserById(userId: number): Promise<boolean>;
  existsOneUserByEmail(email: string): Promise<boolean>;
  updateOneUserById(userId: number, user: User): Promise<void>;
  deleteOneUserById(userId: number): Promise<void>;
}
