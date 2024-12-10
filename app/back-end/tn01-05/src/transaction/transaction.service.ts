import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionDto } from './dto';
import { Page_types, Transaction_states } from '@prisma/client';

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

            if (!student) throw new ForbiddenException("Cannot complete the transaction because of an invalid student ID");

            return (await this.prisma.tRANSACTION.findUnique({
                where: {
                    student_id_time_page_type_price_no_of_pages_state: {
                        student_id: dto.student_id,
                        time: new Date(dto.time),
                        page_type: dto.page_type,
                        price: price,
                        no_of_pages: dto.no_of_pages,
                        state: dto.state,
                    }
                }
            }))
        } 
        catch (error) {
            throw error;
        }
    }

    async commitTransaction(dto: TransactionDto) {
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

            const student = await this.prisma.sTUDENT.findUnique({
                where: {
                    student_id: dto.student_id
                }
            })

            if (!student) throw new ForbiddenException("Cannot complete the transaction because of an invalid student ID");

            if (dto.state == Transaction_states.Successful) {
                let new_pages = 0;

                switch (dto.page_type) {
                    case Page_types.A2:
                        new_pages = student.remaining_A2_pages + dto.no_of_pages;
                        await this.prisma.sTUDENT.update({
                            where: {
                                student_id: dto.student_id,
                            },
                            data: {
                                remaining_A2_pages: new_pages,
                            }
                        })
                        break;
                    case Page_types.A3:
                        new_pages = student.remaining_A3_pages + dto.no_of_pages;
                        await this.prisma.sTUDENT.update({
                            where: {
                                student_id: dto.student_id,
                            },
                            data: {
                                remaining_A3_pages: new_pages,
                            }
                        })
                        break;
                    case Page_types.A4:
                        new_pages = student.remaining_A4_pages + dto.no_of_pages;
                        await this.prisma.sTUDENT.update({
                            where: {
                                student_id: dto.student_id,
                            },
                            data: {
                                remaining_A4_pages: new_pages,
                            }
                        })
                        break;
                    case Page_types.A5:
                        new_pages = student.remaining_A5_pages + dto.no_of_pages;
                        await this.prisma.sTUDENT.update({
                            where: {
                                student_id: dto.student_id,
                            },
                            data: {
                                remaining_A5_pages: new_pages,
                            }
                        })
                        break;
                    case Page_types.Letter:
                        new_pages = student.remaining_Letter_pages + dto.no_of_pages;
                        await this.prisma.sTUDENT.update({
                            where: {
                                student_id: dto.student_id,
                            },
                            data: {
                                remaining_Letter_pages: new_pages,
                            }
                        })
                        break;
                    default:
                        break;
                }
            }

            await this.prisma.tRANSACTION.update({
                where: {
                    student_id_time_page_type_price_no_of_pages_state: {
                        student_id: dto.student_id,
                        time: new Date(dto.time),
                        page_type: dto.page_type,
                        price: price,
                        no_of_pages: dto.no_of_pages,
                        state: Transaction_states.Fail_Pending,
                    }
                },
                data: {
                    state: dto.state
                }
            })

            return await this.prisma.sTUDENT.findUnique({
                where: {
                    student_id: dto.student_id,
                }
            });
        } 
        catch (error) {
            throw error;
        }
    }

    async getTransactionByUserId(user_id: string) {
        const transaction = this.prisma.tRANSACTION.findMany({
            where: {
                student_id: user_id,
            }
        })

        return transaction;
    }
}
