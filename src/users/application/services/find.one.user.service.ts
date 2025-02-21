import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/users/domain/exceptions/user.not.found.exception';
import { User } from 'src/users/domain/models/user.model';
import { UserPersistencePort } from '../ports/out/user.persistence.port';
import { FindOneUserUseCase } from '../ports/in/find.one.user.use.case';

@Injectable()
export class FindOneUserService implements FindOneUserUseCase {
  constructor(
    @Inject('UserPersistencePort')
    private readonly userPersistencePort: UserPersistencePort,
  ) {}
  async execute(userId: number): Promise<User> {
    const optionalUser = await this.userPersistencePort.findOneUserById(userId);
    if (optionalUser.isEmpty()) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }
    return optionalUser.get();
  }
}
