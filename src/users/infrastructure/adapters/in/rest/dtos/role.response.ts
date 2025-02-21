export class RoleResponse {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  constructor(partial?: Partial<RoleResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
