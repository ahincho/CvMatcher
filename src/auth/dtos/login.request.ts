import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    type: String,
    minLength: 2,
    maxLength: 32,
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(2, 32, { message: 'Email must be between 2 and 32 characters' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: 'User password',
    example: 'password123',
    type: String,
    minLength: 8,
    maxLength: 32,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  readonly password: string;
}
