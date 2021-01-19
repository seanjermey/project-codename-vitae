import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileInput } from './create-profile.input';
import { UpdateProfileInput } from './update-profile.input';

@Injectable()
export class ProfilesService {
  /**
   *
   * @param repository
   */
  constructor(
    @InjectRepository(Profile)
    private repository: Repository<Profile>,
  ) {}

  /**
   *
   * @param createProfileInput
   */
  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    const entity = this.repository.create(createProfileInput);

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async read(id: string): Promise<Profile> {
    return this.repository.findOne({ id });
  }

  /**
   *
   * @param updateProfileInput
   */
  async update(updateProfileInput: UpdateProfileInput): Promise<Profile> {
    const entity = {
      ...(await this.read(updateProfileInput.id)),
      ...updateProfileInput,
    };

    return this.repository.save(entity);
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<Profile> {
    const entity = await this.read(id);

    return this.repository.softRemove(entity);
  }

  /**
   *
   */
  async list(ids?: string[]): Promise<Profile[]> {
    if (ids) {
      return this.repository.findByIds(ids);
    }

    return this.repository.find();
  }
}
