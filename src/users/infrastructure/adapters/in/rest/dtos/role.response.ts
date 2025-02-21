import { ApiProperty } from '@nestjs/swagger';

export class RoleResponse {
  @ApiProperty({
    description: 'Unique identifier for the role',
    example: 1,
  })
  readonly id: number;
  @ApiProperty({
    description: 'Name of the role',
    example: 'Administrator',
  })
  readonly name: string;
  @ApiProperty({
    description: 'Date when the role was created',
    example: '2025-02-20T14:30:00Z',
  })
  readonly createdAt: Date;
  @ApiProperty({
    description: 'Date when the role was last updated',
    example: '2025-02-20T14:30:00Z',
  })
  readonly updatedAt: Date;
  constructor(partial?: Partial<RoleResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
