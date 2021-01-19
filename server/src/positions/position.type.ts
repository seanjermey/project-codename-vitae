import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Position')
export class PositionType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}
