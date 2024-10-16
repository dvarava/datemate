import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PartnerModule } from './partner/partner.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    PartnerModule,
  ]
})
export class AppModule {}