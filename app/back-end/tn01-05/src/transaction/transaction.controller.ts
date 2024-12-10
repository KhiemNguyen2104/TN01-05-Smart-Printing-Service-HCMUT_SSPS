import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionDto } from './dto';
import { Page_types, Transaction_states } from '@prisma/client';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionservice: TransactionService) {}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async createTransaction(@Body() data: {
        student_id: string,
        no_of_pages: string,
        page_type: Page_types,
    }) {
        const dto: TransactionDto = {
            student_id: data.student_id,
            no_of_pages: Number(data.no_of_pages),
            page_type: data.page_type,
            time: (new Date()).toISOString(),
            state: Transaction_states.Fail_Pending,
        }

        return this.transactionservice.createTransaction(dto);
    }

    @Put('commit')
    @UseGuards(AuthGuard('jwt'))
    async commitTransaction(@Body() data: {
        student_id: string,
        no_of_pages: string,
        page_type: Page_types,
        state: Transaction_states,
        time: string,
    }) {
        const dto: TransactionDto = {
            student_id: data.student_id,
            no_of_pages: Number(data.no_of_pages),
            page_type: data.page_type,
            time: data.time,
            state: data.state,
        }
        
        return await this.transactionservice.commitTransaction(dto);
    }

    @Get('history/:id')
    @UseGuards(AuthGuard('jwt'))
    async getTransactionByUserId(@Param('id') user_id: string) {
        return this.transactionservice.getTransactionByUserId(user_id);
    }
}
