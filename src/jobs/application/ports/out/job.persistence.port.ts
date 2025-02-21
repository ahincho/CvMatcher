import { Optional } from 'src/commons/domain/models/optional.model';
import { Job } from 'src/jobs/domain/models/job.model';

export interface JobPersistencePort {
  createJobs(jobs: Job[]): Promise<Job[]>;
  findOneJobById(jobId: string): Promise<Optional<Job>>;
}
