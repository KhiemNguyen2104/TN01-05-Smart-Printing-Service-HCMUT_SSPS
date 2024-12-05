import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login() {
        return 'This is the login function'
    }

    signup() {
        return 'This is the signup function'
    }
}
