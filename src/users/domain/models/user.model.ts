import { Role } from './role.model';

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
