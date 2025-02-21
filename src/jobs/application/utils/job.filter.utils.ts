import { Job } from 'src/jobs/domain/models/job.model';

export class JobFilterUtils {
  static filterJobByRoles(job: Job, roles: string[]): Partial<Job> {
    return this.filterJob(job, roles);
  }
  static filterJobsByRoles(jobs: Job[], roles: string[]): Partial<Job>[] {
    return jobs.map((job) => this.filterJob(job, roles));
  }
  private static filterJob(job: Job, roles: string[]): Partial<Job> {
    const isAdministrator = roles.includes('Administrator');
    const isPremium = roles.includes('Premium');
    const isStandard = roles.includes('Standard');
    if (isAdministrator) {
      return job;
    } else if (isPremium) {
      return {
        id: job.id,
        title: job.title,
        description: job.description,
      };
    } else if (isStandard) {
      return {
        id: job.id,
        title: job.title,
      };
    }
    return job;
  }
}
