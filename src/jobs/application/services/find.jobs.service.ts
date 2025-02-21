import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'src/jobs/domain/models/job.model';
import { FindJobsUseCase } from '../ports/in/find.jobs.use.case';
import { JobPersistencePort } from '../ports/out/job.persistence.port';
import { JobProviderPort } from '../ports/out/job.provider.port';
import { JobFilterUtils } from '../utils/job.filter.utils';

@Injectable()
export class FindJobsService implements FindJobsUseCase {
  constructor(
    @Inject('JobProviderPort')
    private readonly jobProviderPort: JobProviderPort,
    @Inject('JobPersistencePort')
    private readonly jobPersistencePort: JobPersistencePort,
  ) {}
  async execute(roles: string[]): Promise<Partial<Job>[]> {
    const jobs = await this.jobProviderPort.findJobs();
    const savedJobs = await this.jobPersistencePort.createJobs(jobs);
    return JobFilterUtils.filterJobsByRoles(savedJobs, roles);
  }
}
