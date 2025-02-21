import { Job } from 'src/jobs/domain/models/job.model';
import { JobResponse } from '../dtos/job.response';

export class JobRestMapper {
  static domainToResponse(job: Partial<Job>): JobResponse {
    return new JobResponse({
      id: job.id,
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      publishedAt: job.publishedAt,
    });
  }
}
