import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOneUserService } from './application/services/create.one.user.service';
import { FindUsersService } from './application/services/find.users.service';
import { FindOneUserService } from './application/services/find.one.user.service';
import { DeleteOneUserService } from './application/services/delete.one.user.service';
import { FindRolesService } from './application/services/find.roles.service';
import { FindOneRoleService } from './application/services/find.one.role.service';
import { UserPersistenceAdapter } from './infrastructure/adapters/out/persistence/implementations/user.persistence.adapter';
import { CreateOneUserRestController } from './infrastructure/adapters/in/rest/controllers/create.one.user.rest.controller';
import { FindUsersRestController } from './infrastructure/adapters/in/rest/controllers/find.users.rest.controller';
import { FindOneUserRestController } from './infrastructure/adapters/in/rest/controllers/find.one.user.rest.controller';
import { DeleteOneUserRestController } from './infrastructure/adapters/in/rest/controllers/delete.one.user.rest.controller';
import { FindRolesRestController } from './infrastructure/adapters/in/rest/controllers/find.roles.rest.controller';
import { FindOneRoleRestController } from './infrastructure/adapters/in/rest/controllers/find.one.role.rest.controller';
import { UserHttpExceptionFilter } from './infrastructure/adapters/in/rest/filters/user.http.exception.filter';
import { UserEntity } from './infrastructure/adapters/out/persistence/entities/user.entity';
import { RoleEntity } from './infrastructure/adapters/out/persistence/entities/role.entity';
import { RolePersistenceAdapter } from './infrastructure/adapters/out/persistence/implementations/role.persistence.adapter';
import { DatabaseInitializerService } from './infrastructure/adapters/out/persistence/initializers/database.initializer.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [
    CreateOneUserRestController,
    FindUsersRestController,
    FindOneUserRestController,
    DeleteOneUserRestController,
    FindRolesRestController,
    FindOneRoleRestController,
  ],
  providers: [
    {
      provide: 'UserPersistencePort',
      useClass: UserPersistenceAdapter,
    },
    {
      provide: 'RolePersistencePort',
      useClass: RolePersistenceAdapter,
    },
    {
      provide: 'CreateOneUserUseCase',
      useClass: CreateOneUserService,
    },
    {
      provide: 'FindUsersUseCase',
      useClass: FindUsersService,
    },
    {
      provide: 'FindOneUserUseCase',
      useClass: FindOneUserService,
    },
    {
      provide: 'DeleteOneUserUseCase',
      useClass: DeleteOneUserService,
    },
    {
      provide: 'FindRolesUseCase',
      useClass: FindRolesService,
    },
    {
      provide: 'FindOneRoleUseCase',
      useClass: FindOneRoleService,
    },
    {
      provide: APP_FILTER,
      useClass: UserHttpExceptionFilter,
    },
    DatabaseInitializerService,
  ],
  exports: [
    'UserPersistencePort',
    'FindOneUserUseCase',
    DatabaseInitializerService,
  ],
})
export class UsersModule {}
