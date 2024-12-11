import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    user_id?: string
    
    @IsString()
    @IsOptional()
    user_name?: string
    
    @IsString()
    @IsOptional()
    @IsEmail()
    user_email?: string

    @IsString()
    @IsOptional()
    user_password?: string
}