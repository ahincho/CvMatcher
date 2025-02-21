import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @Column({ type: 'varchar', length: 32 })
  name: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @ManyToMany(() => UserEntity, (user) => user.roles, { lazy: true })
  users: Promise<UserEntity[]>;
  constructor(partial?: Partial<RoleEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
