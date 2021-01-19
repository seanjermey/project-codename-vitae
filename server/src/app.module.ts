import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectsModule } from './projects/projects.module';
import { PositionsModule } from './positions/positions.module';

import { Profile } from './profiles/profile.entity';
import { Skill } from './skills/skill.entity';
import { Project } from './projects/project.entity';
import { Position } from './positions/position.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/vitae',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Position, Profile, Skill, Project],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    PositionsModule,
    ProjectsModule,
    SkillsModule,
    ProfilesModule,
  ],
})
export class AppModule {}
