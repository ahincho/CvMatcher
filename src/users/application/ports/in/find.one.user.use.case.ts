import { User } from 'src/users/domain/models/user.model';

export interface FindOneUserUseCase {
  execute(userId: number): Promise<User>;
}
