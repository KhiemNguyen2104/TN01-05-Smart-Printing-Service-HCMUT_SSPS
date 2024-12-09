import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionDto } from './dto';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionservice: TransactionService) {}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async createTransaction(@Body() dto: TransactionDto) {
        console.log(dto);

        return this.transactionservice.createTransaction(dto);
    }
}
