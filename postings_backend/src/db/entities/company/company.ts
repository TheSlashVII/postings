import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../user/user.js";
import { Sector } from "../sector/sector.js";
@Entity()
export class Company {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    unique: true
  })
  url_formatted_name: string

  @Column({
    unique: true
  })
  name: string

  @Column({
    nullable: true
  })
  description: string

  @OneToMany(() => User, (user) => user.company)
  user: Relation<User>


  @ManyToMany(() => Sector)
  @JoinTable({
    name: "company_sector",
    joinColumn: {
      name: "id_company"
    },
    inverseJoinColumn: {
      name: "id_sector"
    }
  })
  sector: Relation<Sector>
}
