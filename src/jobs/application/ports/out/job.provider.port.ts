import { Job } from 'src/jobs/domain/models/job.model';

export interface JobProviderPort {
  findJobs(): Promise<Job[]>;
}
