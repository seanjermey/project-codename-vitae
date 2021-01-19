import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectType } from './project.type';
import { ProjectsService } from './projects.service';
import { CreateProjectInput } from './create-project.input';
import { UpdateProjectInput } from './update-project.input';

@Resolver((of) => ProjectType)
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  /**
   *
   */
  @Query((returns) => [ProjectType])
  projects() {
    return this.projectsService.list();
  }

  /**
   *
   * @param id
   */
  @Query((returns) => ProjectType)
  project(@Args('id') id: string) {
    return this.projectsService.read(id);
  }

  /**
   *
   * @param projectInput
   */
  @Mutation((returns) => ProjectType)
  createProject(@Args('project') projectInput: CreateProjectInput) {
    return this.projectsService.create(projectInput);
  }

  /**
   *
   * @param projectInput
   */
  @Mutation((returns) => ProjectType)
  updateProject(@Args('project') projectInput: UpdateProjectInput) {
    return this.projectsService.update(projectInput);
  }
}
