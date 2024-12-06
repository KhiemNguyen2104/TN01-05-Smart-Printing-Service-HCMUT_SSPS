import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {

    @Get('current-user')
    @UseGuards(AuthGuard('jwt'))
    getCurrentUser(@Req() req: Request) {
        return req.user;
    }

    
}
