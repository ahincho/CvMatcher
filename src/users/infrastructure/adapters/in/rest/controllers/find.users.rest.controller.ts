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
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FindUsersUseCase } from 'src/users/application/ports/in/find.users.use.case';
import { UserQueryRequest } from '../dtos/user.query.request';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { Response } from 'express';

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
