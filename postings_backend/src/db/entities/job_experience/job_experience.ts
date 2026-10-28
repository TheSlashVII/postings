import { Column, PrimaryGeneratedColumn, Entity, ForeignKey, ManyToOne, JoinColumn } from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../user/user.js";


@Entity("job_experience")
export class JobExperience {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    length: 250
  })
  position: string // name of the job position

  @Column()
  company_name: string // the company_name will be normalized by the backend

  @Column({
    nullable: true
  })
  start_date: Date

  @Column({
    nullable: true
  })
  end_date: Date

  @Column({
    length: 400
  })
  description: string

  @Column()
  id_user: string

  @ManyToOne(() => User, (user) => user.jobExperience)
  @JoinColumn({ name: "id_user" }) // this defines the name of the column with the foreign key
  user: Relation<User>
}
