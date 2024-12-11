import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignUpDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('login')
    login(@Body() dto: AuthLoginDto) {
        console.log(dto);
        
        return this.authService.login(dto);
    }

    @Post('signup')
    signup(@Body() dto: AuthSignUpDto) {
        return this.authService.signup(dto);
    }
}