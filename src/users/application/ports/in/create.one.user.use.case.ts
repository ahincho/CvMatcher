import { User } from 'src/users/domain/models/user.model';

export interface CreateOneUserUseCase {
  execute(user: User): Promise<User>;
}
