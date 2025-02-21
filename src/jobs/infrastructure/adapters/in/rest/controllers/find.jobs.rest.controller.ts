import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { FindJobsUseCase } from 'src/jobs/application/ports/in/find.jobs.use.case';
import { JobResponse } from '../dtos/job.response';
import { JobRestMapper } from '../mappers/job.rest.mapper';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('/api/v1/jobs')
export class FindJobsRestController {
  constructor(
    @Inject('FindJobsUseCase')
    private readonly findJobsUseCase: FindJobsUseCase,
  ) {}
  @Get()
  @UseGuards(RoleGuard)
  @HasAnyRole('Administrator', 'Premium', 'Standard')
  async findJobs(@Roles() roles: string[]): Promise<JobResponse[]> {
    const jobs = await this.findJobsUseCase.execute(roles);
    return jobs.map(JobRestMapper.domainToResponse);
  }
}
