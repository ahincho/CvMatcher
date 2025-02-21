import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/users/domain/exceptions/user.not.found.exception';
import { DeleteOneUserUseCase } from '../ports/in/delete.one.user.use.case';
import { UserPersistencePort } from '../ports/out/user.persistence.port';

@Injectable()
export class DeleteOneUserService implements DeleteOneUserUseCase {
  constructor(
    @Inject('UserPersistencePort')
    private readonly userPersistencePort: UserPersistencePort,
  ) {}
  async execute(userId: number): Promise<void> {
    if (!(await this.userPersistencePort.existsOneUserById(userId))) {
      throw new UserNotFoundException(`User with id '${userId}' not found`);
    }
    await this.userPersistencePort.deleteOneUserById(userId);
  }
}
