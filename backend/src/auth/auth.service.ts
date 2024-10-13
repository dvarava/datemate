import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async handleAppleLogin(token: string) {
    const decodedToken = jwt.decode(token) as any;

    let email = decodedToken.email || null;

    let existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.usersService.createUser({
      email
});

    return newUser;
  }
}