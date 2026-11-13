import { Injectable } from '@nestjs/common';
import { PasswordHasher, TokenService } from '@nestjs/authentication';
import { JwtService } from '@nestjs/jwt';
import { User } from '../db/entities/user/user.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// repositories
@Injectable()
export class AuthService {
  constructor(private readonly passwordHasher: PasswordHasher, @InjectRepository(User) private userRepository: Repository<User>, private tokenService: TokenService, private jwtService: JwtService) {

  }
  async register(email: string, password: string) {
    // check if the user has sent no fields
    if (email === "" || password === "") {
      throw new Error("All fields are required", { cause: "fields_required" })
    }
    // check if the user already exists
    if (await this.userRepository.exists({ where: { email: email } })) {
      throw new Error("This user already exists", { cause: "user_exists" })
    }
    const user = this.userRepository.create({
      email: email,
      password: await this.passwordHasher.hash(password)
    })
    try {
      this.userRepository.save(user)
    } catch (error) {
      throw new Error("Internal server error", { cause: "internal_error" })
    }
    // the password hasher encrypts the password. It uses a async function because hashing takes time
    return { message: "User created successfuly" }

  }

  async login(email: string, password: string) {
    if (email === "" || password === "") {
      throw new Error("Email and password are required", { cause: "fields_required" })
    }
    let user = await this.userRepository.findOneBy({ email: email });

    if (user) {
      if (await this.passwordHasher.verify(password, user.password)) {
        // const t = await this.tokenService.issue(user.id)
        const t2 = await this.jwtService.signAsync({ sub: user.id, email: user.email, iss: "http://postings.net", aud: "full-app" }, {
          secret: process.env.JWT_SECRET,
          expiresIn: 3600 * 2,

        })
        return { accessToken: t2 };
      } else {
        throw new Error("Incorrect user or password", { cause: "incorrect_credentials" })
      }

    } else {
      throw new Error("Incorrect user or password", { cause: "incorrect_credentials" })
    }

  }
}
