import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindJobsService } from './application/services/find.jobs.service';
import { FindOneJobService } from './application/services/find.one.job.service';
import { JobPersistenceAdapter } from './infrastructure/adapters/out/persistence/implementations/job.persistence.adapter';
import { JobLaborumProviderAdapter } from './infrastructure/adapters/out/provider/job.laborum.provider.adapter';
import { FindJobsRestController } from './infrastructure/adapters/in/rest/controllers/find.jobs.rest.controller';
import { FindOneJobRestController } from './infrastructure/adapters/in/rest/controllers/find.one.job.rest.controller';
import { JobEntity } from './infrastructure/adapters/out/persistence/entities/job.entity';
import { APP_FILTER } from '@nestjs/core';
import { JobHttpExceptionFilter } from './infrastructure/adapters/in/rest/filters/job.http.exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  providers: [
    {
      provide: 'JobProviderPort',
      useClass: JobLaborumProviderAdapter,
    },
    {
      provide: 'JobPersistencePort',
      useClass: JobPersistenceAdapter,
    },
    {
      provide: 'FindJobsUseCase',
      useClass: FindJobsService,
    },
    {
      provide: 'FindOneJobUseCase',
      useClass: FindOneJobService,
    },
    {
      provide: APP_FILTER,
      useClass: JobHttpExceptionFilter,
    },
  ],
  controllers: [FindJobsRestController, FindOneJobRestController],
  exports: [],
})
export class JobsModule {}
