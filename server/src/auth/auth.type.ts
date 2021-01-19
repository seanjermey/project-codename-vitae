import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class AuthType {
  @Field()
  accessToken: string;
}
