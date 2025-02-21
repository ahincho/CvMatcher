import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequest {
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(2, 32, { message: 'Email must be between 2 and 32 characters' })
  @IsEmail()
  readonly email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  readonly password: string;
}
