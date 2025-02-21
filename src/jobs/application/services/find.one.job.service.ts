import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'src/jobs/domain/models/job.model';
import { JobNotFoundException } from 'src/jobs/domain/exceptions/job.not.found.exception';
import { FindOneJobUseCase } from '../ports/in/find.one.job.use.case';
import { JobPersistencePort } from '../ports/out/job.persistence.port';
import { JobFilterUtils } from '../utils/job.filter.utils';

@Injectable()
export class FindOneJobService implements FindOneJobUseCase {
  constructor(
    @Inject('JobPersistencePort')
    private readonly jobPersistencePort: JobPersistencePort,
  ) {}
  async execute(jobId: string, roles: string[]): Promise<Partial<Job>> {
    const optionalJob = await this.jobPersistencePort.findOneJobById(jobId);
    if (optionalJob.isEmpty()) {
      throw new JobNotFoundException(`Job with id '${jobId}' not found`);
    }
    return JobFilterUtils.filterJobByRoles(optionalJob.get(), roles);
  }
}
