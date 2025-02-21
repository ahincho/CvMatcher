export class JobResponse {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  publishedAt: Date;
  constructor(partial?: Partial<JobResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
