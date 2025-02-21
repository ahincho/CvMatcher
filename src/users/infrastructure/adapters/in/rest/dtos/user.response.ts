export class UserResponse {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly roles: string[];
  constructor(partial?: Partial<UserResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
