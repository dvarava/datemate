import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string | null): Promise<User | null>;
    createUser(userData: {
        email: string | null;
    }): Promise<User>;
}
