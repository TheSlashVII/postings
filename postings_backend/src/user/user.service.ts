import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user/user.js';
import { JobExperience } from '../db/entities/job_experience/job_experience.js';
import { SaveOnboardingDto } from './dto/createUserDto.js';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly dataSource: DataSource, private readonly jwtService: JwtService, @InjectRepository(JobExperience) private readonly jobExperienceRepository: Repository<JobExperience>) { }

  async verifySession(token: string) {
    let formattedToken = token.split(" ")[1]
    let userInfo: { sub: string } = this.jwtService.decode(formattedToken)
    if (!await this.userRepository.existsBy({ id: userInfo.sub })) {
      throw new Error("user does not exist", { cause: "user does not exist" })
    } else if (!this.jwtService.verify(formattedToken, { secret: process.env.JWT_SECRET })) {
      throw new Error("user does not exist", { cause: "user does not exist" })
    }
    return { isSessionValid: true }

  }
  // function used to update the newly created user
  async saveNewOnboaringData(data: SaveOnboardingDto, token: string) {
    let t = token.split(" ")[1]
    let userInfo: { sub: string, email: string } = this.jwtService.decode(t)
    let requestedUser = await this.userRepository.findOneBy({ id: userInfo.sub })

    if (!requestedUser) {
      throw new Error("User not found", { cause: "user does not exist" })
    } else {
      const dataManager = this.dataSource.manager
      const jobExperienceFormatted: (JobExperience & { id_user: string })[] = data.jobExperience.map(exp => {
        let n: any = exp
        n.id_user = userInfo.sub
        return n;
      })
      requestedUser.date_of_birth = String(data.personalDetails.date_of_birth)
      requestedUser.name = data.personalDetails.name
      requestedUser.surmame = data.personalDetails.surname
      requestedUser.city_of_residence = data.personalDetails.city_of_residence
      requestedUser.country = data.personalDetails.country
      requestedUser.phone = data.personalDetails.phone
      try {
        await dataManager.transaction(async (transactionManager) => {
          // start transaction
          // If an error occurs inside this transaction, all the operations are rolled back
          await transactionManager.createQueryBuilder().insert().into(JobExperience).values(jobExperienceFormatted).execute()
          await transactionManager.save(requestedUser)
        })
      } catch (error) {
        console.error(error)
        throw new Error("Something went wrong, transaction")

      }

    }

  }

  async getAccountStatus(token: string) {
    let formattedToken = token.split(" ")[1]
    let userInfo: { sub: string } = this.jwtService.decode(formattedToken)


    let requestedUser = await this.userRepository.findOneBy({ id: userInfo.sub })
    if (!requestedUser) {
      throw new Error("Incorrect credentials or user not found", { cause: "user does not exist" })
    } else {
      // if one of the fields of the personal details form is already in the database, means that the user does not need to be redirected to account setup
      if (requestedUser.date_of_birth) {
        return { isUserNew: false }
      } else {
        return { isUserNew: true }
      }
    }
  }
}
