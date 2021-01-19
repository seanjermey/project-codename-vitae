import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphQLGuard extends AuthGuard('jwt') {
  /**
   *
   * @param context
   */
  getRequest(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext();

    console.log(req);

    return req;
  }

  /**
   *
   * @param err
   * @param user
   * @param info
   * @param context
   * @param status
   */
  handleRequest(err, user, info, context, status) {
    console.log({ err, user, info, context, status });

    if (err || !user) {
      throw new UnauthorizedException(err);
    }

    return user;
  }
}
