import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneRoleUseCase } from 'src/users/application/ports/in/find.one.role.use.case';
import { RoleResponse } from '../dtos/role.response';
import { RoleRestMapper } from '../mappers/role.rest.mapper';

@ApiTags('Roles')
@Controller('/api/v1/roles')
export class FindOneRoleRestController {
  constructor(
    @Inject('FindOneRoleUseCase')
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
  ) {}
  @Get(':roleId')
  @ApiOperation({
    summary: 'Get a role by ID',
    description: 'This endpoint retrieves a specific role using its ID.',
  })
  @ApiParam({
    name: 'roleId',
    description: 'The ID of the role to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Role successfully retrieved.',
    type: RoleResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found.',
  })
  async findOneRole(
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<RoleResponse> {
    const role = await this.findOneRoleUseCase.execute(roleId);
    return RoleRestMapper.domainToResponse(role);
  }
}
