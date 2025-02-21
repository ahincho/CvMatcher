import { PageResult } from 'src/commons/domain/models/page.result.model';
import { UserFilters } from 'src/users/domain/models/user.filters.model';
import { User } from 'src/users/domain/models/user.model';

export interface FindUsersUseCase {
  execute(userFilters: UserFilters): Promise<PageResult<User>>;
}
