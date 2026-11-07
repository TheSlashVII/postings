import { Column, PrimaryGeneratedColumn, Entity, ForeignKey, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
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
    nullable: true,
    type: "date"
  })
  start_date: Date | string

  @Column({
    nullable: true,
    type: "date"
  })
  end_date: Date | string

  @Column({
    length: 400
  })
  description: string

  @PrimaryColumn()
  @Column()
  id_user: string

  @ManyToOne(() => User, (user) => user.jobExperience)
  @JoinColumn({ name: "id_user" }) // this defines the name of the column with the foreign key
  user: Relation<User>
}
