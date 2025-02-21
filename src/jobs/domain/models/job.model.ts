export class Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  publishedAt: Date;
  constructor(partial?: Partial<Job>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
