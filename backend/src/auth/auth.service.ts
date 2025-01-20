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
    console.log("Generating token for user:", user);
    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };
    console.log("Token payload:", payload);
    const token = this.jwtService.sign(payload);
    console.log("Generated token:", token);
    return token;
  }

  async handleAppleLogin(token: string) {
    const decodedToken = jwt.decode(token) as any;
    console.log("Decoded Apple token:", decodedToken);
    let email = decodedToken.email || null;
    let existingUser = await this.usersService.findByEmail(email);
    console.log("Found/Created user:", existingUser);

    if (existingUser) {
      const accessToken = this.generateToken(existingUser);
      console.log("Generated token for existing user:", accessToken);
      return { user: existingUser, accessToken };
    }

    const newUser = await this.usersService.createUser({ email });
    console.log("Created new user:", newUser);
    const accessToken = this.generateToken(newUser);
    console.log("Generated token for new user:", accessToken);
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
