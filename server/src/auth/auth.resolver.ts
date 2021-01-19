import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthCredentialsInput } from './auth-credentials.input';
import { AuthType } from './auth.type';

@Resolver('Auth')
export class AuthResolver {
  /**
   *
   * @param authService
   */
  constructor(private authService: AuthService) {}

  /**
   *
   * @param authCredentials
   */
  @Query((returns) => AuthType)
  login(@Args('credentials') authCredentials: AuthCredentialsInput) {
    return this.authService.login(authCredentials);
  }

  /**
   *
   * @param authCredentials
   */
  @Mutation((returns) => AuthType)
  register(@Args('credentials') authCredentials: AuthCredentialsInput) {
    return this.authService.register(authCredentials);
  }
}
