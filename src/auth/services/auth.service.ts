import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPersistencePort } from 'src/users/application/ports/out/user.persistence.port';
import { UserNotFoundException } from 'src/users/domain/exceptions/user.not.found.exception';
import { User } from 'src/users/domain/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserPersistencePort')
    private userPersistencePort: UserPersistencePort,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const optionalUser =
      await this.userPersistencePort.findOneUserByEmail(email);
    if (optionalUser.isEmpty()) {
      throw new UserNotFoundException(`User with email '${email}' not found`);
    }
    const user = optionalUser.get();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  async login(user: User) {
    const payload = {
      username: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.name),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
