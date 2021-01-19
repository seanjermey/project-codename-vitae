import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('Position')
export class Position {
  @ObjectIdColumn()
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;
}
