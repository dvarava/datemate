import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('apple')
  async loginWithApple(@Body('token') token: string) {
    const user = await this.authService.handleAppleLogin(token);
    return { user };
  }
}