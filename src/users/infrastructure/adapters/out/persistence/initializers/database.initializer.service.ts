import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/models/user.model';
import { UserPersistencePort } from 'src/users/application/ports/out/user.persistence.port';
import { RolePersistencePort } from 'src/users/application/ports/out/role.persistence.port';
import { RoleEntity } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseInitializerService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseInitializerService.name);
  private readonly defaultRoles = ['Standard', 'Premium', 'Administrator'];
  private readonly defaultUsers = [
    {
      firstname: 'Angel Eduardo',
      lastname: 'Hincho Jove',
      email: 'ahincho@unsa.edu.pe',
      password: 'ahincho@dev',
      roles: ['Administrator'],
    },
    {
      firstname: 'Juan',
      lastname: 'Pérez',
      email: 'juan.perez@example.com',
      password: 'juan.perez@dev',
      roles: ['Premium'],
    },
    {
      firstname: 'Maria',
      lastname: 'Gonzalez',
      email: 'maria.gonzalez@example.com',
      password: 'maria.gonzales@dev',
      roles: ['Standard'],
    },
  ];
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @Inject('UserPersistencePort')
    private readonly userPersistencePort: UserPersistencePort,
    @Inject('RolePersistencePort')
    private readonly rolePersistencePort: RolePersistencePort,
  ) {}
  async onModuleInit() {
    await this.ensureDefaultRolesExist();
    await this.ensureDefaultUsersExist();
  }
  private async ensureDefaultRolesExist() {
    const existingRoles = await this.roleRepository
      .createQueryBuilder('role')
      .select('role.name')
      .getMany();
    const existingRoleNames = existingRoles.map((role) => role.name);
    const rolesToInsert = this.defaultRoles.filter(
      (role) => !existingRoleNames.includes(role),
    );
    if (rolesToInsert.length > 0) {
      await this.roleRepository.insert(rolesToInsert.map((name) => ({ name })));
      this.logger.log(`Inserted roles: ${rolesToInsert.join(', ')}`);
    } else {
      this.logger.log('All required roles already exist');
    }
    await this.rolePersistencePort.loadRolesToCache();
  }
  private async ensureDefaultUsersExist() {
    const rolesMap = await this.getAllRoles();
    for (const userData of this.defaultUsers) {
      const exists = await this.userPersistencePort.existsOneUserByEmail(
        userData.email,
      );
      if (!exists) {
        const user = new User({
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          password: userData.password,
        });
        const createdUser = await this.userPersistencePort.createOneUser(user);
        this.logger.log(`Inserted user: ${userData.email}`);
        if (userData.roles.length > 0) {
          const roleEntities = userData.roles
            .map((role) => rolesMap.get(role))
            .filter((role) => role !== undefined);
          if (roleEntities.length !== userData.roles.length) {
            this.logger.warn(
              `Skipping additional roles for ${userData.email}: Some roles do not exist`,
            );
            continue;
          }
          await this.userPersistencePort.assignRolesToUser(
            createdUser.id,
            roleEntities.map((role) => role.id),
          );
          this.logger.log(
            `Assigned roles [${userData.roles.join(', ')}] to user ${userData.email}`,
          );
        }
      } else {
        this.logger.log(`User ${userData.email} already exists`);
      }
    }
  }
  private async getAllRoles(): Promise<Map<string, RoleEntity>> {
    const roles = await this.roleRepository.find();
    return new Map(roles.map((role) => [role.name, role]));
  }
}
