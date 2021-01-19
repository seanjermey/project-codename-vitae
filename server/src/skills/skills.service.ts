import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Skill } from './skill.entity';
import { CreateSkillInput } from './create-skill.input';
import { UpdateSkillInput } from './update-skill.input';

@Injectable()
export class SkillsService {
  /**
   *
   * @param repository
   */
  constructor(
    @InjectRepository(Skill)
    private repository: Repository<Skill>,
  ) {}

  /**
   *
   * @param createSkillInput
   */
  async create({ title }: CreateSkillInput): Promise<Skill> {
    const entity = this.repository.create({
      id: uuid(),
      title,
    });

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async read(id: string): Promise<Skill> {
    return this.repository.findOne({ id });
  }

  /**
   *
   * @param updateSkillInput
   */
  async update(updateSkillInput: UpdateSkillInput): Promise<Skill> {
    const entity = {
      ...(await this.read(updateSkillInput.id)),
      ...updateSkillInput,
    };

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<Skill> {
    const entity = await this.read(id);

    return this.repository.softRemove(entity);
  }

  /**
   *
   */
  async list(ids?: string[]): Promise<Skill[]> {
    if (ids) {
      return this.repository.find({
        where: { id: { $in: ids }, deletedAt: null },
      });
    }

    return this.repository.find({ where: { deletedAt: null } });
  }
}
