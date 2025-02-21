import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  Res,
} from '@nestjs/common';
import { FindRolesUseCase } from 'src/users/application/ports/in/find.roles.use.case';
import { RoleQueryRequest } from '../dtos/role.query.request';
import { RoleRestMapper } from '../mappers/role.rest.mapper';
import { Response } from 'express';

@Controller('/api/v1/roles')
export class FindRolesRestController {
  constructor(
    @Inject('FindRolesUseCase')
    private readonly findRolesUseCase: FindRolesUseCase,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findRoles(
    @Query() roleQueryRequest: RoleQueryRequest,
    @Res() response: Response,
  ): Promise<void> {
    const roleFilters = RoleRestMapper.queryRequestToDomain(roleQueryRequest);
    const rolePageResult = await this.findRolesUseCase.execute(roleFilters);
    if (rolePageResult.items.length === 0) {
      response.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    response
      .status(HttpStatus.OK)
      .json(RoleRestMapper.domainPageResultToResponse(rolePageResult));
  }
}
