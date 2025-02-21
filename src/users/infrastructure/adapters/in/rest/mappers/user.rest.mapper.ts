import { Page } from 'src/commons/domain/models/page.model';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { User } from 'src/users/domain/models/user.model';
import { UserFilters } from 'src/users/domain/models/user.filters.model';
import { UserResponse } from '../dtos/user.response';
import { UserQueryRequest } from '../dtos/user.query.request';
import { UserCreateRequest } from '../dtos/user.create.request';

export class UserRestMapper {
  static queryRequestToDomain(userQueryRequest: UserQueryRequest): UserFilters {
    const page = new Page({
      number: userQueryRequest.page,
      size: userQueryRequest.size,
    });
    return new UserFilters({ page: page });
  }
  static domainToResponse(user: User): UserResponse {
    return new UserResponse({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: user.roles?.map((role) => role.name) ?? [],
    });
  }
  static domainPageResultToResponse(
    userPageResult: PageResult<User>,
  ): PageResult<UserResponse> {
    return new PageResult<UserResponse>({
      totalItems: userPageResult.totalItems,
      totalPages: userPageResult.totalPages,
      currentPage: userPageResult.currentPage,
      pageSize: userPageResult.pageSize,
      hasNextPage: userPageResult.hasNextPage,
      items: userPageResult.items.map(this.domainToResponse),
    });
  }
  static createRequestToDomain(userCreateRequest: UserCreateRequest): User {
    return new User({
      firstname: userCreateRequest.firstname,
      lastname: userCreateRequest.lastname,
      email: userCreateRequest.email,
      password: userCreateRequest.password,
    });
  }
}
