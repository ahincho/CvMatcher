import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { FindOneUserUseCase } from 'src/users/application/ports/in/find.one.user.use.case';
import { UserResponse } from '../dtos/user.response';
import { UserRestMapper } from '../mappers/user.rest.mapper';

@Controller('/api/v1/users')
export class FindOneUserRestController {
  constructor(
    @Inject('FindOneUserUseCase')
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}
  @Get(':userId')
  @UseGuards(RoleGuard)
  @HasAnyRole('Administrator')
  async findOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponse> {
    const user = await this.findOneUserUseCase.execute(userId);
    return UserRestMapper.domainToResponse(user);
  }
}
