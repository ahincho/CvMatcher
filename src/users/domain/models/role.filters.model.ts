import { Page } from 'src/commons/domain/models/page.model';

export class RoleFilters {
  page: Page;
  constructor(partial?: Partial<RoleFilters>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
