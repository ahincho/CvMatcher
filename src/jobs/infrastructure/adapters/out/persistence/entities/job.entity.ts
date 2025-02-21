import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'jobs' })
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 128 })
  title: string;
  @Column({ type: 'varchar', length: 256 })
  description: string;
  @Column({ type: 'varchar', length: 128 })
  company: string;
  @Column({ type: 'varchar', length: 128 })
  location: string;
  @Column({ type: 'date' })
  publishedAt: Date;
  constructor(partial?: Partial<JobEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
