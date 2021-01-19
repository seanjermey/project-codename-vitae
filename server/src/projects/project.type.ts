import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}
