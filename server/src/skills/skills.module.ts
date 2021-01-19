import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsResolver } from './skills.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), AuthModule],
  providers: [SkillsService, SkillsResolver],
  exports: [SkillsService],
})
export class SkillsModule {}
