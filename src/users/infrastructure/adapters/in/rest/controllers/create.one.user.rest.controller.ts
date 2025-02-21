import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateOneUserUseCase } from 'src/users/application/ports/in/create.one.user.use.case';
import { UserCreateRequest } from '../dtos/user.create.request';
import { UserResponse } from '../dtos/user.response';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { Request, Response } from 'express';

@Controller('/api/v1/users')
export class CreateOneUserRestController {
  constructor(
    @Inject('CreateOneUserUseCase')
    private readonly createOneUserUseCase: CreateOneUserUseCase,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Public()
  async createOneUser(
    @Body() userCreateRequest: UserCreateRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<UserResponse> {
    const user = UserRestMapper.createRequestToDomain(userCreateRequest);
    const savedUser = await this.createOneUserUseCase.execute(user);
    const location = `${request.protocol}://${request.get('host')}/api/v1/users/${savedUser.id}`;
    const responseUser = UserRestMapper.domainToResponse(savedUser);
    response.setHeader('Location', location);
    response.status(HttpStatus.CREATED).json(responseUser);
    return responseUser;
  }
}
