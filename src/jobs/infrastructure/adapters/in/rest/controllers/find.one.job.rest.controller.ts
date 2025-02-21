import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FindOneJobUseCase } from 'src/jobs/application/ports/in/find.one.job.use.case';
import { JobResponse } from '../dtos/job.response';
import { JobRestMapper } from '../mappers/job.rest.mapper';

@ApiTags('Jobs')
@Controller('/api/v1/jobs')
export class FindOneJobRestController {
  constructor(
    @Inject('FindOneJobUseCase')
    private readonly findOneJobUseCase: FindOneJobUseCase,
  ) {}
  @Get(':jobId')
  @HasAnyRole('Administrator', 'Premium', 'Standard')
  @ApiOperation({
    summary: 'Get job details',
    description: 'Fetches detailed information of a specific job by jobId.',
  })
  @ApiParam({
    name: 'jobId',
    type: String,
    description: 'Unique identifier for the job',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Ejemplo de UUID
  })
  @ApiResponse({
    status: 200,
    description: 'Job details returned successfully.',
    type: JobResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. User does not have the required role.',
  })
  @ApiResponse({
    status: 404,
    description: 'Job not found with the provided jobId.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. User not authenticated.',
  })
  async findOneJob(
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Roles() roles: string[],
  ): Promise<JobResponse> {
    const job = await this.findOneJobUseCase.execute(jobId, roles);
    return JobRestMapper.domainToResponse(job);
  }
}
