import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('Profile')
export class Profile {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  nickname: string;

  @Column()
  description: string;

  @Column()
  profilePicture: string;

  @Column()
  backgroundImage: string;

  @Column()
  links: string[];

  @Column()
  positions: string[];

  @Column()
  projects: string[];

  @Column()
  skills: string[];

  @Column()
  courses: string[];

  @Column()
  user: string;
}
