export class RoleDuplicatedException extends Error {
  constructor(public readonly message: string) {
    super(message ?? 'Role already exists');
  }
}
