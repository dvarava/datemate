import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private generateToken(user: any) {
    return this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });
  }

  async handleAppleLogin(token: string) {
    const decodedToken = jwt.decode(token) as any;
    let email = decodedToken.email || null;
    let existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      const accessToken = this.generateToken(existingUser);
      return { user: existingUser, accessToken };
    }

    const newUser = await this.usersService.createUser({ email });
    const accessToken = this.generateToken(newUser);
    return { user: newUser, accessToken };
  }

  async handleGoogleLogin(googleData: { email: string }) {
    const { email } = googleData;
    let existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      const accessToken = this.generateToken(existingUser);
      return { user: existingUser, accessToken };
    }

    const newUser = await this.usersService.createUser({ email });
    const accessToken = this.generateToken(newUser);
    return { user: newUser, accessToken };
  }
}
