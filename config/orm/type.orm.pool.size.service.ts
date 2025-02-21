import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class TypeOrmPoolSizeService implements OnModuleDestroy {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async onModuleDestroy() {
    await this.dataSource.destroy();
  }
}
