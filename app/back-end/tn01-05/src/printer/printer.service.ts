import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPrinterDto, PrintingJobDto } from './dto';
import * as argon from 'argon2';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PrinterService {
    constructor (private prisma: PrismaService, private fileservice: FileService) {}

    async addNewPrinter(dto: NewPrinterDto) {
        try {
            const newPrinter = await this.prisma.pRINTER.create({
                data: {
                    printer_id: dto.printer_id,
                    printer_name: dto.printer_name,
                    ...(dto.manufacturer && {manufacturer: dto.manufacturer}),
                    ...(dto.description && {description: dto.description}),
                    location: dto.location,
                }
            });

            return newPrinter;
        }
        catch (error) {
            throw error;
        }
    }

    async addNewPrinters(data: [dto: NewPrinterDto]) {
        try {
            for (let record of data) {
                await this.addNewPrinter(record);
            }

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    async findPrinterById(in_printer_id: string): Promise<any> {
        try {
            const printer = await this.prisma.pRINTER.findUnique({
                where: {
                    printer_id: in_printer_id,
                },
            })

            return printer;
        }
        catch (error) {
            throw error;
        }
    }

    async findPrinterByName(
        in_printer_name: string,
        in_orderBy: undefined | "printer_id" | "printer_name" | "manufacturer" | "location" = undefined,
        asc: boolean = true,
    ): Promise<any> {
        try {
            const printers = await this.prisma.pRINTER.findMany({
                where: {
                    printer_name: in_printer_name,
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            return printers;
        }
        catch (error) {
            throw error;
        }
    }

    async findPrinterByManufacturer(
        in_manufacturer: string,
        in_orderBy: undefined | "printer_id" | "printer_name" | "manufacturer" | "location" = undefined,
        asc: boolean = true,
    ): Promise<any> {
        try {
            const printers = await this.prisma.pRINTER.findMany({
                where: {
                    manufacturer: in_manufacturer,
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            return printers;
        }
        catch (error) {
            throw error;
        }
    }

    async getAllPrinters() {
        const printers = await this.prisma.pRINTER.findMany({});

        return printers;
    }

    // TODO: Implements the printing jobs
    async prints(dto: PrintingJobDto) {
        const printing_job_id = await argon.hash(dto.student_id + " " + dto.printer_id + " " + dto.file_name);

        const file = (await this.fileservice.findFileByName(dto.file_name))[0];

        console.log({printing_job_id: printing_job_id, file: file});

        const student = await this.prisma.sTUDENT.update({
            where: {
                student_id: dto.student_id,
            },
            data: {
                prints: {
                    create: {
                        printing_job_id: printing_job_id,
                        printer_id: dto.printer_id,
                        file_id: file.file_id,
                        start_time: new Date(dto.start_time),
                        end_time: new Date(dto.end_time),
                        no_of_copies: dto.no_of_copies,
                        double_sided: dto.double_sided,
                        direction: dto.direction,
                        page_type: dto.page_type,
                        state: dto.state,
                        pages: dto.pages,
                    }
                }
            }
        })

        if (!student) throw new ForbiddenException("Cannot print because of an invalid student ID");
        
        const printer = await this.prisma.pRINTER.update({
            where: {
                printer_id: dto.printer_id,
            },
            data: {
                prints: {
                    create: {
                        printing_job_id: printing_job_id,
                        student_id: dto.student_id,
                        file_id: file.file_id,
                        start_time: new Date(dto.start_time),
                        end_time: new Date(dto.end_time),
                        no_of_copies: dto.no_of_copies,
                        double_sided: dto.double_sided,
                        direction: dto.direction,
                        page_type: dto.page_type,
                        state: dto.state,
                        pages: dto.pages,
                    }
                }
            }
        })

        if (!printer) throw new ForbiddenException("Cannot print because of an invalid printer ID");

        return await this.prisma.pRINTS.findUnique({
            where: {
                student_id: dto.student_id,
                printer_id: dto.printer_id,
                printing_job_id: printing_job_id,
                file_id: file.file_id,
            }
        });
    }
}
