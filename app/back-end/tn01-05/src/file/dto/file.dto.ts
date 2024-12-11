import { File_types } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UploadFileDto {
    @IsString()
    @IsNotEmpty()
    student_id: string

    @IsString()
    @IsNotEmpty()
    file_name: string

    @IsString()
    @IsNotEmpty()
    file_type: File_types

    @IsNumber()
    @IsNotEmpty()
    file_size: number
}