import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectType } from '../projects/project.type';
import { SkillType } from '../skills/skill.type';
import { PositionType } from '../positions/position.type';

@ObjectType('Profile')
export class ProfileType {
  @Field((type) => ID)
  id: string;

  @Field()
  fullname: string;

  @Field()
  nickname: string;

  @Field()
  description: string;

  @Field()
  profilePicture: string;

  @Field()
  backgroundImage: string;

  // @Field()
  // links: string[];

  @Field((type) => [PositionType])
  positions: string[];

  @Field((type) => [ProjectType])
  projects: string[];

  @Field((type) => [SkillType])
  skills: string[];

  // @Field()
  // courses: string[];

  // @Field()
  // user: string;
}
