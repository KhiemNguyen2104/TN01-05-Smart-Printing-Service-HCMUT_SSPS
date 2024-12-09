import { Body, Controller, Get, Param, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query, Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userservice: UserService) {}

    // Setting functions

    @Get('current-user')
    @UseGuards(AuthGuard('jwt'))
    getCurrentUser(@Req() req: Request) {
        return req.user;
    }

    @Get('id/:id')
    @UseGuards(AuthGuard('jwt'))
    async findUserById(@Param('id') user_id: string) {
        return await this.userservice.findUserById(user_id);
    }

    @Get('name')
    @UseGuards(AuthGuard('jwt'))
    async findUserByName(
        @Query('user_name') user_name: string,
        @Query('orderBy') orderBy: undefined | "user_id" | "user_name" | "user_email",
        @Query('acs') acs: string
    ) {
        let flag = true;
        if (acs == 'false') flag = false
        
        return await this.userservice.findUserByName(user_name, orderBy, flag);
    }

    @Get('email')
    @UseGuards(AuthGuard('jwt'))
    async findUserByEmail(@Query('user_email') user_email: string) {
        return await this.userservice.findUserByEmail(user_email);
    }

    @Get('year/:year')
    @UseGuards(AuthGuard('jwt'))
    async findUserByYear(
        @Param('year') user_year: "17" | "18" | "19" | "22" | "21" | "23" | "20" | "00",
        @Query('orderBy') orderBy: undefined | "user_id" | "user_name" | "user_email",
        @Query('acs') acs: string
    ) {
        let flag = true;
        if (acs == 'false') flag = false
        
        return await this.userservice.findUserByYear(user_year, orderBy, flag);
    }

    @Get('student/remaining_pages')
    @UseGuards(AuthGuard('jwt'))
    async findStudentByRemainingPages(
        @Query('floor') floor: string,
        @Query('ceil') ceil: string,
        @Query('orderBy') orderBy: undefined | "student_id" | "remaining_pages",
        @Query('acs') acs: string
    ) {
        let flag = true;
        if (acs == 'false') flag = false
        
        return await this.userservice.findStudentByRemainingPages(Number(floor), Number(ceil), orderBy, flag);
    }

    @Get('spso/:id')
    @UseGuards(AuthGuard('jwt'))
    async findSPSO(@Param('id') user_id: string) {
        return await this.userservice.findSPSO(user_id);
    }

    // Setting functions

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Body() dto: UpdateUserDto) {
        return await this.userservice.updateUser(dto);
    }
}
