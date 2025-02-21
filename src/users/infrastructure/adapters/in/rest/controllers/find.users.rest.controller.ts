import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FindUsersUseCase } from 'src/users/application/ports/in/find.users.use.case';
import { UserResponse } from '../dtos/user.response';
import { UserQueryRequest } from '../dtos/user.query.request';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { Response } from 'express';

@ApiTags('Users')
@Controller('/api/v1/users')
export class FindUsersRestController {
  constructor(
    @Inject('FindUsersUseCase')
    private readonly findUsersUseCase: FindUsersUseCase,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard)
  @HasAnyRole('Administrator')
  @ApiOperation({
    summary: 'Get users with pagination and filters',
    description:
      'This endpoint retrieves a paginated list of users with optional filters.',
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
    description: 'The number of users per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Users successfully retrieved.',
    type: [UserResponse],
  })
  @ApiResponse({
    status: 204,
    description: 'No users found.',
  })
  async findUsers(
    @Query() userQueryRequest: UserQueryRequest,
    @Res() response: Response,
  ): Promise<void> {
    const userFilters = UserRestMapper.queryRequestToDomain(userQueryRequest);
    const userPageResult = await this.findUsersUseCase.execute(userFilters);
    if (userPageResult.items.length === 0) {
      response.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    response
      .status(HttpStatus.OK)
      .json(UserRestMapper.domainPageResultToResponse(userPageResult));
  }
}
