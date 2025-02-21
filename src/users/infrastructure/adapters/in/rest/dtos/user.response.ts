import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  readonly id: number;
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  readonly firstname: string;
  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  readonly lastname: string;
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  readonly email: string;
  @ApiProperty({
    description: 'Date when the user was created',
    example: '2025-02-20T14:30:00Z',
  })
  readonly createdAt: Date;
  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2025-02-20T14:30:00Z',
  })
  readonly updatedAt: Date;
  @ApiProperty({
    description: 'Roles assigned to the user',
    type: [String],
    example: ['Administrator', 'User'],
  })
  readonly roles: string[];
  constructor(partial?: Partial<UserResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
