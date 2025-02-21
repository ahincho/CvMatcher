import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
  ) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('jwt.secret'),
      signOptions: {
        expiresIn: this.configService.get('jwt.expiresIn'),
      },
    };
  }
  get secret() {
    return this.configService.get('jwt.secret');
  }
}

export default () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
});
