import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("apple")
  async loginWithApple(@Body("token") token: string) {
    return await this.authService.handleAppleLogin(token);
  }

  @Post("google")
  async loginWithGoogle(@Body() googleData: { email: string }) {
    return await this.authService.handleGoogleLogin(googleData);
  }
}
