import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SkillType } from './skill.type';
import { SkillsService } from './skills.service';
import { CreateSkillInput } from './create-skill.input';
import { UpdateSkillInput } from './update-skill.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from '../auth/graphql.guard';

@Resolver((of) => SkillType)
export class SkillsResolver {
  /**
   *
   * @param skillsService
   */
  constructor(private skillsService: SkillsService) {}

  /**
   *
   */
  @Query((returns) => [SkillType])
  @UseGuards(GraphQLGuard)
  async skills() {
    return this.skillsService.list();
  }

  /**
   *
   * @param id
   */
  @Query((returns) => SkillType)
  async skill(@Args('id') id: string) {
    return this.skillsService.read(id);
  }

  /**
   *
   * @param skillInput
   */
  @Mutation((returns) => SkillType)
  async createSkill(@Args('skill') skillInput: CreateSkillInput) {
    return this.skillsService.create(skillInput);
  }

  /**
   *
   * @param skillInput
   */
  @Mutation((returns) => SkillType)
  async updateSkill(@Args('skill') skillInput: UpdateSkillInput) {
    return this.skillsService.update(skillInput);
  }

  /**
   *
   * @param id
   */
  @Mutation((returns) => SkillType)
  async deleteSkill(@Args('id') id: string) {
    return this.skillsService.delete(id);
  }
}
