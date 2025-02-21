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
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { DeleteOneUserUseCase } from 'src/users/application/ports/in/delete.one.user.use.case';

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
  async deleteOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.deleteOneUserUseCase.execute(userId);
  }
}
