import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsInput } from './auth-credentials.input';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   *
   * @param authCredentialsDto
   */
  async register({ username, password }: AuthCredentialsInput): Promise<User> {
    try {
      return await this.create({
        username,
        password: await this.hashPassword(password),
      });
    } catch (err) {
      switch (err.code) {
        case '23505':
          throw new ConflictException('Username already exists');

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  /**
   *
   * @param username
   * @param password
   */
  async validatePassword({
    username,
    password,
  }: AuthCredentialsInput): Promise<boolean> {
    const user = await this.findOne({ username });

    return user && (await user.validatePassword(password));
  }

  /**
   *
   * @param password
   * @param salt
   */
  private async hashPassword(password: string, salt?: string): Promise<string> {
    return await bcrypt.hash(password, salt || (await bcrypt.genSalt()));
  }
}
