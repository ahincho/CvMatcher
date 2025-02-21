import { Job } from 'src/jobs/domain/models/job.model';

export interface FindJobsUseCase {
  execute(roles: string[]): Promise<Partial<Job>[]>;
}
