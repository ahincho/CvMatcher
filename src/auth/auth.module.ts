import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from 'config/jwt/jwt.config.module';
import { JwtConfigService } from 'config/jwt/jwt.config.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    UsersModule,
    JwtConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RoleGuard],
  exports: [JwtModule, AuthService, JwtAuthGuard, RoleGuard],
})
export class AuthModule {}
