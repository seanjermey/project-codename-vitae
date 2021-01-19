import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('Project')
export class Project {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;
}
