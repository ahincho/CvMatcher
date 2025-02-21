import { Job } from 'src/jobs/domain/models/job.model';
import { JobEntity } from '../entities/job.entity';
import { createHash } from 'crypto';

export class JobPersistenceMapper {
  static domainToEntity(job: Job): JobEntity {
    return new JobEntity({
      id: JobPersistenceMapper.generateConsistentUuid(job.id),
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      publishedAt: job.publishedAt,
    });
  }
  static entityToDomain(jobEntity: JobEntity): Job {
    return new Job({
      id: jobEntity.id,
      title: jobEntity.title,
      description: jobEntity.description,
      company: jobEntity.company,
      location: jobEntity.location,
      publishedAt: jobEntity.publishedAt,
    });
  }
  private static generateConsistentUuid(value: string): string {
    const hash = createHash('sha256');
    hash.update(value);
    const hashValue = hash.digest('hex');
    const uuid =
      hashValue.slice(0, 8) +
      '-' +
      hashValue.slice(8, 12) +
      '-' +
      hashValue.slice(12, 16) +
      '-' +
      hashValue.slice(16, 20) +
      '-' +
      hashValue.slice(20, 32);
    return uuid;
  }
}
