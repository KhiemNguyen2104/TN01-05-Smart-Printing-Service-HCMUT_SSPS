import { Page_types, Transaction_states } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionDto {
    @IsString()
    @IsNotEmpty()
    student_id: string

    @IsString()
    @IsNotEmpty()
    time: string = (new Date()).toISOString()

    @IsNotEmpty()
    page_type: Page_types

    @IsNotEmpty()
    @IsNumber()
    no_of_pages: number

    @IsNotEmpty()
    state: Transaction_states = Transaction_states.Fail_Pending
}