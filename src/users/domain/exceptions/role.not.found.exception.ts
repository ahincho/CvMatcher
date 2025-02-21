export class RoleNotFoundException extends Error {
  constructor(public readonly message: string) {
    super(message ?? 'Role not found');
  }
}
