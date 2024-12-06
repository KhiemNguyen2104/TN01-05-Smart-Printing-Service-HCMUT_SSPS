import { Body, Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query, Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userservice: UserService) {}

    @Get('current-user')
    @UseGuards(AuthGuard('jwt'))
    getCurrentUser(@Req() req: Request) {
        return req.user;
    }

    @Get('id/:id')
    @UseGuards(AuthGuard('jwt'))
    findUserById(@Param('id') user_id: string) {
        return this.userservice.findUserById(user_id);
    }

    @Get('name')
    @UseGuards(AuthGuard('jwt'))
    findUserByName(@Query('user_name') user_name: string) {
        return this.userservice.findUserByName(user_name);
    }

    @Get('email')
    @UseGuards(AuthGuard('jwt'))
    findUserByEmail(@Query('user_email') user_email: string) {
        return this.userservice.findUserByEmail(user_email);
    }

    @Get('year/:year')
    @UseGuards(AuthGuard('jwt'))
    findUserByYear(@Param('year') user_year: "20" | "21" | "22" | "23" | "00") {
        return this.userservice.findUserByYear(user_year);
    }

    @Get('student/remaining_pages')
    @UseGuards(AuthGuard('jwt'))
    findStudentByRemainingPages(
        @Query('floor') floor: number,
        @Query('ceil') ceil: number
    ) {
        return this.userservice.findStudentByRemainingPages(Number(floor), Number(ceil));
    }
}
