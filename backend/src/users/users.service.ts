import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
  async findByEmail(email: string | null): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async createUser(userData: { email: string | null }): Promise<User> {
    const newUser = new this.userModel({
      email: userData.email
    });
    return newUser.save();
  }
}