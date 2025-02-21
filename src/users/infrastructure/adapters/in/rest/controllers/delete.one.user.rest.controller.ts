import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { DeleteOneUserUseCase } from 'src/users/application/ports/in/delete.one.user.use.case';

@ApiTags('Users')
@Controller('/api/v1/users')
export class DeleteOneUserRestController {
  constructor(
    @Inject('DeleteOneUserUseCase')
    private readonly deleteOneUserUseCase: DeleteOneUserUseCase,
  ) {}
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RoleGuard)
  @HasAnyRole('Administrator')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'This endpoint deletes a user by ID.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user to be deleted',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user ID provided.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async deleteOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.deleteOneUserUseCase.execute(userId);
  }
}
