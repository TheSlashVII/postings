import { JwtBearerProvider, JwtClaims, AuthenticationRegistry } from "@nestjs/authentication";
import { User } from "../../db/entities/user/user.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
@Injectable()
export class JwtAuth extends JwtBearerProvider<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    registry: AuthenticationRegistry,
  ) {
    // The key, issuer and audience come from the `accessToken` options.
    super({ realm: 'store' });
    // Second in the chain, after SessionAuth (order 0).
    registry.registerProvider(this, { order: 0 });
  }

  // Called after the signature and claims checked out.
  // Returning null (the user was deleted) rejects the token.
  validate({ sub }: JwtClaims) {
    // return sub ? this.usersRepository.findById(sub) : null;
    return sub ? this.usersRepository.findOneBy({ id: sub }) : null

  }
}
