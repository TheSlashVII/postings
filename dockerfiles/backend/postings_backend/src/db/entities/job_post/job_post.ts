import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import type { Relation } from "typeorm";
import { ApplicationStatus } from "../application-status/application-status.js";
import { Sector } from "../sector/sector.js";
@Entity("job_post")
export class JobPost {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column()
  experience_required: number

  @Column()
  description: number

  @Column()
  post_status: string

  @OneToMany(() => ApplicationStatus, (applicationStatus) => applicationStatus.jobPost)
  applicationStatus: Relation<ApplicationStatus>

  @ManyToMany(() => Sector)
  @JoinTable({
    name: "job_sector",
    joinColumn: {
      name: "id_sector"
    },
    inverseJoinColumn: {
      name: "id_job"
    }
  })
  sector: Relation<Sector>


}
