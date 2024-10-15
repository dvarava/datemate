import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    handleAppleLogin(token: string): Promise<import("../users/users.schema").User>;
    handleGoogleLogin(googleData: {
        email: string;
    }): Promise<import("../users/users.schema").User>;
}
