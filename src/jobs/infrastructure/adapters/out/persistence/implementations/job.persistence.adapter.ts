import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optional } from 'src/commons/domain/models/optional.model';
import { JobPersistencePort } from 'src/jobs/application/ports/out/job.persistence.port';
import { Job } from 'src/jobs/domain/models/job.model';
import { JobEntity } from '../entities/job.entity';
import { JobPersistenceMapper } from '../mappers/job.persistence.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class JobPersistenceAdapter implements JobPersistencePort {
  constructor(
    @InjectRepository(JobEntity)
    private readonly _jobRepository: Repository<JobEntity>,
  ) {}
  async createJobs(jobs: Job[]): Promise<Job[]> {
    const jobEntities = jobs.map(JobPersistenceMapper.domainToEntity);
    const savedJobs = await this._jobRepository.save(jobEntities);
    return savedJobs.map(JobPersistenceMapper.entityToDomain);
  }
  async findOneJobById(jobId: string): Promise<Optional<Job>> {
    const jobEntity = await this._jobRepository
      .createQueryBuilder('job')
      .where('job.id = :id', { id: jobId })
      .getOne();
    if (!jobEntity) {
      return Optional.empty<Job>();
    }
    return Optional.of(JobPersistenceMapper.entityToDomain(jobEntity));
  }
}
