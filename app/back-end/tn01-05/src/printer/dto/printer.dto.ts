import { Locations } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NewPrinterDto {
    @IsString()
    @IsNotEmpty()
    printer_id: string

    @IsNotEmpty()
    @IsString()
    printer_name: string

    @IsString()
    @IsOptional()
    manufacturer?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    location: Locations;
}

export class UpdatePrinterDto {
    @IsString()
    @IsNotEmpty()
    printer_id: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    printer_name?: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()

    manufacturer?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    location?: string
}

export class PrintingJob {
    @IsString()
    @IsNotEmpty()
    printing_job_id: string

    @IsString()
    @IsNotEmpty()
    student_id: string

    @IsString()
    @IsNotEmpty()
    printer_id: string

    @IsString()
    @IsNotEmpty()
    start_time: string

    @IsString()
    @IsNotEmpty()
    end_time: string

    // @IsString()
    // @IsNotEmpty()
    // printer_id: string

    // @IsString()
    // @IsNotEmpty()
    // printer_id: string

    // @IsString()
    // @IsNotEmpty()
    // printer_id: string

    // @IsString()
    // @IsNotEmpty()
    // printer_id: string

    // @IsString()
    // @IsNotEmpty()
    // printer_id: string

    // @IsString()
    // @IsNotEmpty()
    // printer_id: string
}