import { User } from './user.model';

export class Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  constructor(partial?: Partial<Role>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
