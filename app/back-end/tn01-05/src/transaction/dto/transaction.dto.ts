import { Page_types, Transaction_states } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionDto {
    @IsString()
    @IsNotEmpty()
    student_id: string

    @IsString()
    @IsNotEmpty()
    time: string

    @IsNotEmpty()
    page_type: Page_types

    @IsNotEmpty()
    @IsNumber()
    no_of_pages: number

    state: Transaction_states
}