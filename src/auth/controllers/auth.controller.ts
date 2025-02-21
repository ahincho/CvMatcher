import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from '../dtos/login.request';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  async login(@Body() loginRequest: LoginRequest) {
    const user = await this.authService.validateUser(
      loginRequest.email,
      loginRequest.password,
    );
    return this.authService.login(user);
  }
}
