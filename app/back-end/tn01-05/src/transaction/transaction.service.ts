import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionDto } from './dto';
import { Page_types } from '@prisma/client';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    async createTransaction(dto: TransactionDto) {
        try {
            let price = 0;

            switch (dto.page_type) {
                case Page_types.A2:
                    price = 1000;
                    break;
                case Page_types.A3:
                    price = 600;
                    break;
                case Page_types.A4:
                    price = 300;
                    break;
                case Page_types.A5:
                    price = 200;
                    break;
                case Page_types.Letter:
                    price = 310;
                    break;
            }

            const student = await this.prisma.sTUDENT.update({
                where: {
                    student_id: dto.student_id
                },
                data: {
                    transactions: {
                        create: {
                            time: new Date(dto.time),
                            price: price,
                            page_type: dto.page_type,
                            no_of_pages: dto.no_of_pages,
                            state: dto.state,
                        }
                    }
                }
            })
        } 
        catch (error) {
            throw error;
        }
    }
}
