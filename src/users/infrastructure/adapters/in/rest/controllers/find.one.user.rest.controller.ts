import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { FindOneUserUseCase } from 'src/users/application/ports/in/find.one.user.use.case';
import { UserResponse } from '../dtos/user.response';
import { UserRestMapper } from '../mappers/user.rest.mapper';

@ApiTags('Users')
@Controller('/api/v1/users')
export class FindOneUserRestController {
  constructor(
    @Inject('FindOneUserUseCase')
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}
  @Get(':userId')
  @UseGuards(RoleGuard)
  @HasAnyRole('Administrator')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'This endpoint retrieves a user by their unique ID.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved.',
    type: UserResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, user does not have the required role.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponse> {
    const user = await this.findOneUserUseCase.execute(userId);
    return UserRestMapper.domainToResponse(user);
  }
}
