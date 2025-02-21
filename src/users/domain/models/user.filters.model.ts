import { Page } from 'src/commons/domain/models/page.model';

export class UserFilters {
  page: Page;
  constructor(partial?: Partial<UserFilters>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
