import { Controller, Headers, Get, Post, HttpException, HttpStatus, Body, InternalServerErrorException, BadRequestException, UnprocessableEntityException, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from '@nestjs/authentication';
import { AuthFieldsValidationPipe } from './schemas/auth.schema.js';
import { authSchema } from './pipes/auth.pipe.js';
import type { AuthDto } from './pipes/auth.pipe.js';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @UsePipes(new AuthFieldsValidationPipe(authSchema)) // this is like a prevalidation before arriving to the endpoint. if the data is not formatted correctly it throws an error
  @Post("login")
  async login(@Body() authDto: AuthDto) {
    try {
      return await this.authService.login(authDto.email, authDto.password)

    } catch (err: any) {
      if (err.cause === "incorrect_credentials") {
        throw new BadRequestException("An error has ocurred: No user was found.", { cause: "User not found" })
      }
      else if (err.cause == "fields_required") {
        throw new UnprocessableEntityException("All the fields are required")
      }
      throw new InternalServerErrorException("Something went wrong", {
        description: err.message
      })
    }
  }

  @Public()
  @UsePipes(new AuthFieldsValidationPipe(authSchema))
  @Post("register")
  async register(@Body() authDto: AuthDto) {
    try {
      return await this.authService.register(authDto.email, authDto.password)
    } catch (error: any) {
      if (error.cause == "fields_required") {
        throw new UnprocessableEntityException("All the fields are required")
      } else if (error.cause === "user_exists") {
        throw new BadRequestException("An error has ocurred: This user already exists")
      }
      // incase something else happens
      throw new InternalServerErrorException("something went wrong", {
        cause: error
      })
    }
  }

}
