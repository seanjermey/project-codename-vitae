import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class UpdateSkillInput {
  @Field((type) => ID)
  @IsUUID()
  id: string;

  @Field()
  @MinLength(2)
  title: string;
}
