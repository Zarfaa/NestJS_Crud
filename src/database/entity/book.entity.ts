import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  IBN: string;

  @Column()
  genre: string;

  @Column({ nullable: true })
  borrowerId: number;
}
