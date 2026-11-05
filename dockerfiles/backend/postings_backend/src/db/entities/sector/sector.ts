import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sector {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string


}
