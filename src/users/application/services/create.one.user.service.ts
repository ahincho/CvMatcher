import { Inject, Injectable } from '@nestjs/common';
import { UserDuplicateException } from 'src/users/domain/exceptions/user.duplicate.exception';
import { User } from 'src/users/domain/models/user.model';
import { CreateOneUserUseCase } from '../ports/in/create.one.user.use.case';
import { UserPersistencePort } from '../ports/out/user.persistence.port';

@Injectable()
export class CreateOneUserService implements CreateOneUserUseCase {
  constructor(
    @Inject('UserPersistencePort')
    public readonly userPersistencePort: UserPersistencePort,
  ) {}
  async execute(user: User): Promise<User> {
    if (await this.userPersistencePort.existsOneUserByEmail(user.email)) {
      throw new UserDuplicateException(
        `User with email '${user.email}' already exists`,
      );
    }
    return await this.userPersistencePort.createOneUser(user);
  }
}
