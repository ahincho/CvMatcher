import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from '../dtos/login.request';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiResponseProperty,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  @ApiOperation({
    summary: 'User login',
    description:
      'Validates user credentials and returns a JWT token if successful.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns an access token.',
    type: Object,
    examples: {
      success: {
        summary: 'Successful login',
        value: {
          accessToken: 'your-jwt-token-here',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid email or password.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Incorrect credentials.',
  })
  async login(
    @Body() loginRequest: LoginRequest,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(
      loginRequest.email,
      loginRequest.password,
    );
    return this.authService.login(user);
  }
}
