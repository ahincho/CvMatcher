import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { HasAnyRole } from 'src/auth/decorators/has.any.role.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FindOneJobUseCase } from 'src/jobs/application/ports/in/find.one.job.use.case';
import { JobResponse } from '../dtos/job.response';
import { JobRestMapper } from '../mappers/job.rest.mapper';

@Controller('/api/v1/jobs')
export class FindOneJobRestController {
  constructor(
    @Inject('FindOneJobUseCase')
    private readonly findOneJobUseCase: FindOneJobUseCase,
  ) {}
  @Get(':jobId')
  @HasAnyRole('Administrator', 'Premium', 'Standard')
  async findOneJob(
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Roles() roles: string[],
  ): Promise<JobResponse> {
    const job = await this.findOneJobUseCase.execute(jobId, roles);
    return JobRestMapper.domainToResponse(job);
  }
}
