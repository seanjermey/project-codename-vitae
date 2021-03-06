import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @MinLength(2)
  fullname: string;

  @Field()
  @MinLength(2)
  nickname: string;

  // TODO: add missing fields

  @Field((type) => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  positions: string[];

  @Field((type) => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  projects: string[];

  @Field((type) => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  skills: string[];

  @Field((type) => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  courses: string[];

  @Field((type) => ID)
  @IsUUID('4')
  user: string;
}
