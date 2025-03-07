import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserCreateRequest {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    minLength: 2,
    maxLength: 32,
  })
  @IsString({ message: 'Firstname must be a string' })
  @IsNotEmpty({ message: 'Firstname is required' })
  @Length(2, 32, { message: 'Firstname must be between 2 and 32 characters' })
  readonly firstname: string;
  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    minLength: 2,
    maxLength: 32,
  })
  @IsString({ message: 'Lastname must be a string' })
  @IsNotEmpty({ message: 'Lastname is required' })
  @Length(2, 32, { message: 'Lastname must be between 2 and 32 characters' })
  readonly lastname: string;
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(2, 32, { message: 'Email must be between 2 and 32 characters' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: 'Password for the user account',
    example: 'Password123',
    minLength: 8,
    maxLength: 32,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  readonly password: string;
}
