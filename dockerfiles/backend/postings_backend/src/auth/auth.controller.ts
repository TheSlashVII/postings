import { Controller, Get, Post, HttpException, HttpStatus, Body, InternalServerErrorException, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from '@nestjs/authentication';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post("login")
  async login(@Body("email") email: string, @Body("password") password: string) {
    try {
      return await this.authService.login(email, password)

    } catch (err: any) {
      if (err.cause === "incorrect_credentials") {
        throw new BadRequestException("User not found")
      }
      throw new InternalServerErrorException("Something went wrong", {
        description: err.message
      })
    }
  }

  @Public()
  @Post("register")
  async register(@Body("email") email: string, @Body("password") password: string) {
    try {
      return await this.authService.register(email, password)
    } catch (error: any) {
      if (error.cause == "fields_required") {
        throw new UnprocessableEntityException("All the fields are required")
      } else if (error.cause === "user_exists") {
        throw new BadRequestException("This user already exists")
      }
      // incase something else happens
      throw new InternalServerErrorException("something went wrong", {
        cause: error
      })
    }
  }

}
