import { Job } from 'src/jobs/domain/models/job.model';

export interface FindOneJobUseCase {
  execute(jobId: string, roles: string[]): Promise<Partial<Job>>;
}
