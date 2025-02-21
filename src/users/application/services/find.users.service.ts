import { Inject, Injectable } from '@nestjs/common';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { UserFilters } from 'src/users/domain/models/user.filters.model';
import { User } from 'src/users/domain/models/user.model';
import { FindUsersUseCase } from '../ports/in/find.users.use.case';
import { UserPersistencePort } from '../ports/out/user.persistence.port';

@Injectable()
export class FindUsersService implements FindUsersUseCase {
  constructor(
    @Inject('UserPersistencePort')
    private readonly userPersistencePort: UserPersistencePort,
  ) {}
  async execute(userFilters: UserFilters): Promise<PageResult<User>> {
    return await this.userPersistencePort.findUsers(userFilters);
  }
}
