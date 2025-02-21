export class JobNotFoundException extends Error {
  constructor(public readonly message: string) {
    super(message ?? 'Job not found');
  }
}
