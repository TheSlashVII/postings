import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PasswordHasher } from '@nestjs/authentication';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user/user.js';
import { JobExperience } from '../db/entities/job_experience/job_experience.js';
import { JobPost } from '../db/entities/job_post/job_post.js';
import { Sector } from '../db/entities/sector/sector.js';
import { ApplicationStatus } from '../db/entities/application-status/application-status.js';
import { Company } from '../db/entities/company/company.js';
import { JwtAuth } from './jwt/jwt-auth.provider.js';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [AuthService, PasswordHasher, JwtService, JwtAuth],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, JobExperience, JobPost, Sector, ApplicationStatus, Company])]
})
export class AuthModule { }
