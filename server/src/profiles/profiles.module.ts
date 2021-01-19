import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { SkillsModule } from '../skills/skills.module';
import { ProjectsModule } from '../projects/projects.module';
import { PositionsModule } from '../positions/positions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PositionsModule,
    ProjectsModule,
    SkillsModule,
  ],
  providers: [ProfilesService, ProfilesResolver],
  exports: [ProfilesService],
})
export class ProfilesModule {}
