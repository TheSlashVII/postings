import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../user/user.js";
import { JobPost } from "../job_post/job_post.js";
export enum JobStatus {
  APPLIED = "applied",
  REJECTED = "rejected",
  IN_PROCESS = "in_process"

}
@Entity("application_status")
export class ApplicationStatus {

  @PrimaryColumn()
  id_user: string

  @PrimaryColumn()
  id_post: string

  @ManyToOne(() => User, (user) => user.applicationStatus)
  @JoinColumn({
    name: "id_user"
  })
  user: Relation<User>

  @ManyToOne(() => JobPost, (jobPost) => jobPost.applicationStatus)
  @JoinColumn({
    name: "id_post"
  })
  jobPost: Relation<JobPost>

  @Column()
  applied: boolean

  @Column({
    type: "enum",
    default: JobStatus.APPLIED,
    enum: JobStatus
  })
  status: JobStatus

  // will automatically insert the date 
  @CreateDateColumn()
  applied_date: Date

}
