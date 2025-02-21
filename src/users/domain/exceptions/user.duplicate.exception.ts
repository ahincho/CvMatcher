export class UserDuplicateException extends Error {
  constructor(public readonly message: string) {
    super(message ?? 'User already exists');
  }
}
