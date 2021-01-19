import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './position.entity';
import { CreatePositionInput } from './create-position.input';
import { UpdatePositionInput } from './update-position.input';

@Injectable()
export class PositionsService {
  /**
   *
   * @param repository
   */
  constructor(
    @InjectRepository(Position)
    private repository: Repository<Position>,
  ) {}

  /**
   *
   * @param createPositionInput
   */
  async create(createPositionInput: CreatePositionInput): Promise<Position> {
    const entity = this.repository.create(createPositionInput);

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async read(id: string): Promise<Position> {
    return this.repository.findOne({ id });
  }

  /**
   *
   * @param updatePositionInput
   */
  async update(updatePositionInput: UpdatePositionInput): Promise<Position> {
    const entity = {
      ...(await this.read(updatePositionInput.id)),
      ...updatePositionInput,
    };

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<Position> {
    const entity = await this.read(id);

    return this.repository.softRemove(entity);
  }

  /**
   *
   */
  async list(ids?: string[]): Promise<Position[]> {
    if (ids) {
      return this.repository.findByIds(ids);
    }

    return this.repository.find();
  }
}
