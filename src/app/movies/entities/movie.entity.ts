import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  director: string;

  @Column()
  releaseDate: number;

  @Column()
  genre: string;
}
