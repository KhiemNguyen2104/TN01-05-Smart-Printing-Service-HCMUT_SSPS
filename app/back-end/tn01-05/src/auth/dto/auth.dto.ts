import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class AuthSignUpDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}