import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class RoleQueryRequest {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  readonly page: number = 0;
  @ApiProperty({
    description: 'Number of items per page for pagination (max 50)',
    example: 10,
    minimum: 1,
    maximum: 50,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(50)
  readonly size: number = 10;
}
