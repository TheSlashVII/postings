import { JoinColumn, OneToMany, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm"
import type { Relation } from "typeorm"
import { JobExperience } from "../job_experience/job_experience.js"
import { Company } from "../company/company.js"
import { JobPost } from "../job_post/job_post.js"
import { ApplicationStatus } from "../application-status/application-status.js"

// entities are the representation of tables
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    length: 150,
    nullable: true
  })
  name: string

  @Column({
    length: 200,
    nullable: true
  })
  surmame: string

  @Column({
    type: "date",
    nullable: true
  })
  date_of_birth: Date

  @Column({
    length: 200,
    nullable: true
  })
  city_of_residence: string

  @Column({
    length: 150
  })
  email: string

  @Column()
  password: string

  @Column({
    nullable: true
  })
  phone: string

  @Column({
    default: null,
    nullable: true
  })
  id_company: string

  // relationships
  // we use this import type because in ESM projects it can lead to errors when generating migrations
  @OneToMany(() => JobExperience, (jobExperience) => jobExperience.user)
  jobExperience: Relation<JobExperience[]>

  @ManyToOne(() => Company, (company) => company.user)
  @JoinColumn({ name: "id_company" })
  company: Relation<Company>

  @OneToMany(() => ApplicationStatus, (applicationStatus) => applicationStatus.user)
  applicationStatus: Relation<ApplicationStatus>


}
