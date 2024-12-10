import { Page_types, Transaction_states } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionDto {
    @IsString()
    @IsNotEmpty()
    student_id: string

    @IsString()
    @IsNotEmpty()
    time: string = (new Date()).toISOString()

    @IsNotEmpty()
    @IsEnum(Page_types)
    page_type: Page_types

    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    no_of_pages: number

    @IsNotEmpty()
    @IsEnum(Transaction_states)
    state: Transaction_states = Transaction_states.Fail_Pending
}