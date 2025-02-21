import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseConfigModule } from "config/database/database.config.module";
import { TypeOrmConfigService } from "./type.orm.config.service";
import { TypeOrmPoolSizeService } from "./type.orm.pool.size.service";
import typeOrmConfig from "./type.orm.config";

@Module({
  imports: [
    DatabaseConfigModule,
    ConfigModule.forFeature(typeOrmConfig)
  ],
  providers: [
    TypeOrmConfigService,
    TypeOrmPoolSizeService,
  ],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
