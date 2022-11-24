import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(user) {
    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload)
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
