import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsInput } from './auth-credentials.input';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
  /**
   *
   * @param userRepository
   * @param jwtService
   */
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param authCredentialsInput
   */
  async register(
    authCredentialsInput: AuthCredentialsInput,
  ): Promise<AuthType> {
    const user = await this.userRepository.register(authCredentialsInput);

    return this.login(authCredentialsInput);
  }

  /**
   *
   * @param authCredentialsInput
   */
  async login(authCredentialsInput: AuthCredentialsInput): Promise<AuthType> {
    const authenticated = await this.userRepository.validatePassword(
      authCredentialsInput,
    );

    if (!authenticated) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      username: authCredentialsInput.username,
    };

    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }
}
