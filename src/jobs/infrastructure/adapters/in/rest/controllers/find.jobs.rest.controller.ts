import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FindJobsUseCase } from 'src/jobs/application/ports/in/find.jobs.use.case';
import { JobResponse } from '../dtos/job.response';
import { JobRestMapper } from '../mappers/job.rest.mapper';

@ApiTags('Jobs')
@Controller('/api/v1/jobs')
export class FindJobsRestController {
  constructor(
    @Inject('FindJobsUseCase')
    private readonly findJobsUseCase: FindJobsUseCase,
  ) {}
  @Get()
  @UseGuards(RoleGuard)
  @HasAnyRole('Administrator', 'Premium', 'Standard')
  @ApiOperation({
    summary: 'Find available jobs',
    description:
      'Fetches jobs based on user roles (Administrator, Premium, Standard).',
  })
  @ApiResponse({
    status: 200,
    description: 'List of jobs returned successfully.',
    type: [JobResponse],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. User does not have the required role.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. User not authenticated.',
  })
  async findJobs(@Roles() roles: string[]): Promise<JobResponse[]> {
    const jobs = await this.findJobsUseCase.execute(roles);
    return jobs.map(JobRestMapper.domainToResponse);
  }
}
