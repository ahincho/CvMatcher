import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindRolesUseCase } from 'src/users/application/ports/in/find.roles.use.case';
import { RoleResponse } from '../dtos/role.response';
import { RoleQueryRequest } from '../dtos/role.query.request';
import { RoleRestMapper } from '../mappers/role.rest.mapper';
import { Response } from 'express';

@ApiTags('Roles')
@Controller('/api/v1/roles')
export class FindRolesRestController {
  constructor(
    @Inject('FindRolesUseCase')
    private readonly findRolesUseCase: FindRolesUseCase,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get roles with pagination and filters',
    description:
      'This endpoint retrieves a paginated list of roles with optional filters.',
  })
  @ApiQuery({
    name: 'page',
    description: 'The page number for pagination',
    required: false,
    type: Number,
    example: 0,
  })
  @ApiQuery({
    name: 'size',
    description: 'The number of roles per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Roles successfully retrieved.',
    type: [RoleResponse],
  })
  @ApiResponse({
    status: 204,
    description: 'No roles found.',
  })
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
