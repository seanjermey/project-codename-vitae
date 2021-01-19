import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectInput } from './create-project.input';
import { UpdateProjectInput } from './update-project.input';

@Injectable()
export class ProjectsService {
  /**
   *
   * @param repository
   */
  constructor(
    @InjectRepository(Project)
    private repository: Repository<Project>,
  ) {}

  /**
   *
   * @param createProjectInput
   */
  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const entity = this.repository.create(createProjectInput);

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async read(id: string): Promise<Project> {
    return this.repository.findOne({ id });
  }

  /**
   *
   * @param updateProjectInput
   */
  async update(updateProjectInput: UpdateProjectInput): Promise<Project> {
    const entity = {
      ...(await this.read(updateProjectInput.id)),
      ...updateProjectInput,
    };

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<Project> {
    const entity = await this.read(id);

    return this.repository.softRemove(entity);
  }

  /**
   *
   */
  async list(ids?: string[]): Promise<Project[]> {
    if (ids) {
      return this.repository.findByIds(ids);
    }

    return this.repository.find();
  }
}
