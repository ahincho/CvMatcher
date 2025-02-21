import { ApiProperty } from '@nestjs/swagger';

export class JobResponse {
  @ApiProperty({
    description: 'Unique identifier for the job',
    example: '12345',
  })
  id: string;
  @ApiProperty({
    description: 'Title of the job',
    example: 'Software Engineer',
  })
  title: string;
  @ApiProperty({
    description: 'Detailed description of the job position',
    example: 'We are looking for a passionate Software Engineer...',
  })
  description: string;
  @ApiProperty({
    description: 'Company offering the job',
    example: 'TechCorp',
  })
  company: string;
  @ApiProperty({
    description: 'Location of the job',
    example: 'Remote',
  })
  location: string;
  @ApiProperty({
    description: 'Date when the job was published',
    example: '2025-02-20T14:30:00Z',
  })
  publishedAt: Date;
  constructor(partial?: Partial<JobResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
