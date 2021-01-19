import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateSkillInput {
  @Field()
  @MinLength(2)
  title: string;
}
