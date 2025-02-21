import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @Column({ type: 'varchar', length: 32 })
  firstname: string;
  @Column({ type: 'varchar', length: 32 })
  lastname: string;
  @Column({ type: 'varchar', length: 64 })
  email: string;
  @Column({ type: 'varchar', length: 256 })
  password: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  @ManyToMany(() => RoleEntity, (role) => role.users)
  roles: RoleEntity[];
  constructor(partial?: Partial<UserEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
