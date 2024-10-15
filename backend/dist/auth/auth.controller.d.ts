import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginWithApple(token: string): Promise<{
        user: import("../users/users.schema").User;
    }>;
    loginWithGoogle(googleData: {
        email: string;
    }): Promise<{
        user: import("../users/users.schema").User;
    }>;
}
