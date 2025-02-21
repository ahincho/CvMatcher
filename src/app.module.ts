import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'config/app/app.config.module';
import { DatabaseConfigModule } from 'config/database/database.config.module';
import { TypeOrmConfigService } from 'config/orm/type.orm.config.service';
import { TypeOrmConfigModule } from 'config/orm/type.orm.config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseConfigModule,
    TypeOrmModule.forRootAsync({
      useExisting: TypeOrmConfigService,
      imports: [TypeOrmConfigModule],
    }),
    AuthModule,
    UsersModule,
    JobsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
