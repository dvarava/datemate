import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { User, UserSchema } from "../users/users.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key", // Move to env variables in production
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
