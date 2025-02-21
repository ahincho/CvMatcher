import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtConfigService } from 'config/jwt/jwt.config.service';
import { FindOneUserUseCase } from 'src/users/application/ports/in/find.one.user.use.case';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    @Inject('FindOneUserUseCase')
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigService.secret,
    });
  }
  async validate(payload: any) {
    return await this.findOneUserUseCase.execute(payload.sub);
  }
}
