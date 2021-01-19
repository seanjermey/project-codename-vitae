import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Skill')
export class SkillType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}
