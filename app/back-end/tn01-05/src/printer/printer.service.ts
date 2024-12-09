import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPrinterDto } from './dto';

@Injectable()
export class PrinterService {
    constructor (private prisma: PrismaService) {}

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

    // TODO: Implements the printing jobs
    // async prints()
}
