import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { ProfileType } from './profile.type';
import { CreateProfileInput } from './create-profile.input';
import { UpdateProfileInput } from './update-profile.input';
import { Profile } from './profile.entity';
import { SkillsService } from '../skills/skills.service';
import { ProjectsService } from '../projects/projects.service';
import { PositionsService } from '../positions/positions.service';

@Resolver((of) => ProfileType)
export class ProfilesResolver {
  /**
   *
   * @param positionsService
   * @param profilesService
   * @param projectsService
   * @param skillsService
   */
  constructor(
    private positionsService: PositionsService,
    private profilesService: ProfilesService,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
  ) {}

  /**
   *
   */
  @Query((returns) => [ProfileType])
  profiles() {
    return this.profilesService.list();
  }

  /**
   *
   * @param id
   */
  @Query((returns) => ProfileType)
  profile(@Args('id') id: string) {
    return this.profilesService.read(id);
  }

  /**
   *
   * @param profileInput
   */
  @Mutation((returns) => ProfileType)
  createProfile(@Args('profile') profileInput: CreateProfileInput) {
    return this.profilesService.create(profileInput);
  }

  /**
   *
   * @param profileInput
   */
  @Mutation((returns) => ProfileType)
  updateProfile(@Args('profile') profileInput: UpdateProfileInput) {
    return this.profilesService.update(profileInput);
  }

  /**
   *
   * @param profile
   */
  @ResolveField()
  async positions(@Parent() profile: Profile) {
    return this.positionsService.list(profile.positions);
  }

  /**
   *
   * @param profile
   */
  @ResolveField()
  async projects(@Parent() profile: Profile) {
    return this.projectsService.list(profile.projects);
  }

  /**
   *
   * @param profile
   */
  @ResolveField()
  async skills(@Parent() profile: Profile) {
    return this.skillsService.list(profile.skills);
  }
}
