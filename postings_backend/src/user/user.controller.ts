import { Controller, Get, Post, Body, Headers, BadRequestException, InternalServerErrorException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service.js';
import { SaveOnboardingDto } from './dto/createUserDto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Post("onboard")
  async saveNewData(@Body() onboadingDto: SaveOnboardingDto, @Headers("Authorization") token: string) {
    try {
      await this.userService.saveNewOnboaringData(onboadingDto, token)
      return { message: "success" }
    } catch (error: any) {
      if (error.cause == "user does not exist") {
        throw new BadRequestException("Incorrect credentials or user not found")
      } else {
        throw new InternalServerErrorException("Something went wrong", error.message)
      }
    }
  }
  @Post("account_setup/status")
  async getAccountSetupStatus(@Headers("Authorization") token: string) {
    try {
      return await this.userService.getAccountStatus(token)
    } catch (error: any) {
      if (error.cause === "user does not exist") {
        throw new BadRequestException("Incorrect credentials or user not found")
      }
      throw new InternalServerErrorException("Something went wrong")
    }
  }

  @Get("account/verify_session")
  async verifyAccountSession(@Headers("Authorization") token: string) {
    try {
      return await this.userService.verifySession(token)
    } catch (error: any) {
      if (error.cause === "user does not exist") {
        throw new UnauthorizedException("Incorrect credentials or user not found")
      }
      throw new InternalServerErrorException("Something went wrong", { cause: error.cause })

    }

  }

  @Post("account/set_employer")
  async setupEmployerAccount(@Headers("Authorization") token: string, @Body("company_name") companyName: string) {
    try {
      return await this.userService.setupEmployerAccount(companyName, token)
    } catch (error: any) {
      if (error.cause == "user does not exist") {
        throw new UnauthorizedException("Incorrect credentials or user not found")
      }
      throw new InternalServerErrorException("Something went wrong", { cause: error.cause })
    }

  }

}
