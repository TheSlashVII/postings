import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user/user.js';
import { JobExperience } from '../db/entities/job_experience/job_experience.js';
import { JobPost } from '../db/entities/job_post/job_post.js';
import { ApplicationStatus } from '../db/entities/application-status/application-status.js';
import { Company } from '../db/entities/company/company.js';
import { Sector } from '../db/entities/sector/sector.js';
@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
  imports: [TypeOrmModule.forFeature([User, JobExperience, JobPost, Sector, ApplicationStatus, Company])]
})
export class UserModule { }
