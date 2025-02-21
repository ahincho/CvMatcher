import { Page } from 'src/commons/domain/models/page.model';
import { PageResult } from 'src/commons/domain/models/page.result.model';
import { Role } from 'src/users/domain/models/role.model';
import { RoleFilters } from 'src/users/domain/models/role.filters.model';
import { RoleResponse } from '../dtos/role.response';
import { RoleQueryRequest } from '../dtos/role.query.request';

export class RoleRestMapper {
  static queryRequestToDomain(roleQueryRequest: RoleQueryRequest): RoleFilters {
    const page = new Page({
      number: roleQueryRequest.page,
      size: roleQueryRequest.size,
    });
    return new RoleFilters({ page: page });
  }
  static domainToResponse(role: Role): RoleResponse {
    return new RoleResponse({
      id: role.id,
      name: role.name,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    });
  }
  static domainPageResultToResponse(
    rolePageResult: PageResult<Role>,
  ): PageResult<RoleResponse> {
    return new PageResult<RoleResponse>({
      totalItems: rolePageResult.totalItems,
      totalPages: rolePageResult.totalPages,
      currentPage: rolePageResult.currentPage,
      pageSize: rolePageResult.pageSize,
      hasNextPage: rolePageResult.hasNextPage,
      items: rolePageResult.items.map(this.domainToResponse),
    });
  }
}
