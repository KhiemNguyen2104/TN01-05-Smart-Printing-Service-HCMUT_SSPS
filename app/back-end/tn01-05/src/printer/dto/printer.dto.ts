import { Locations, Page_directions, Page_types, Printing_states } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

export class PrintingJobDto {
    @IsString()
    @IsNotEmpty()
    student_id: string

    @IsString()
    @IsNotEmpty()
    printer_id: string

    @IsString()
    @IsNotEmpty()
    file_name: string

    @IsString()
    @IsNotEmpty()
    start_time: string = (new Date()).toISOString()

    @IsString()
    @IsNotEmpty()
    end_time: string

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    no_of_copies: number

    @Transform(({ value }) => value === 'true', { toClassOnly: true })
    @IsBoolean()
    @IsNotEmpty()
    double_sided: boolean = false

    @Transform(({ value }) => value === 'landscape'? Page_directions.Landscape : Page_directions.Portrait, { toClassOnly: true })
    @IsNotEmpty()
    direction: Page_directions = Page_directions.Portrait

    @IsNotEmpty()
    @IsEnum(Page_types)
    page_type: Page_types = Page_types.A4

    @IsNotEmpty()
    @IsEnum(Printing_states)
    state: Printing_states = Printing_states.Fail_Not_Enough_pages

    @IsNotEmpty()
    @IsString()
    pages: string

    constructor(partial?: Partial<PrintingJobDto>) {
        Object.assign(this, partial);
        if (!this.end_time) {
            this.end_time = this.start_time; // Set end_time to start_time if it's not provided
        }
    }
}

export class PrintingJobUpdateDto {
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
    file_name: string

    @IsNotEmpty()
    @IsEnum(Printing_states)
    state: Printing_states = Printing_states.Fail_Cancel
}