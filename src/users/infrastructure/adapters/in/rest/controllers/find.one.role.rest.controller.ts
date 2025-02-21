import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneRoleUseCase } from 'src/users/application/ports/in/find.one.role.use.case';
import { RoleResponse } from '../dtos/role.response';
import { RoleRestMapper } from '../mappers/role.rest.mapper';

@Controller('/api/v1/roles')
export class FindOneRoleRestController {
  constructor(
    @Inject('FindOneRoleUseCase')
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
  ) {}
  @Get(':roleId')
  async findOneRole(
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<RoleResponse> {
    const role = await this.findOneRoleUseCase.execute(roleId);
    return RoleRestMapper.domainToResponse(role);
  }
}
