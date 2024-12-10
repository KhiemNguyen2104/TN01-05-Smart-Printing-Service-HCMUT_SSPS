import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPrinterDto, PrintingJobDto } from './dto';
import * as argon from 'argon2';
import { FileService } from 'src/file/file.service';
import { Printing_states } from '@prisma/client';

@Injectable()
export class PrinterService {
    constructor(private prisma: PrismaService, private fileservice: FileService) { }

    async addNewPrinter(dto: NewPrinterDto) {
        try {
            const newPrinter = await this.prisma.pRINTER.create({
                data: {
                    printer_id: dto.printer_id,
                    printer_name: dto.printer_name,
                    ...(dto.manufacturer && { manufacturer: dto.manufacturer }),
                    ...(dto.description && { description: dto.description }),
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

        const file = this.prisma.fILE.findFirst({
            where: {
                file_name: dto.file_name,
            }
        })

        if (!file) throw new ForbiddenException("The file is not exist");

        const upload = await this.prisma.uPLOADS.findFirst({
            where: {
                file_id: (await file).file_id,
                student_id: dto.student_id,
            }
        });

        if (!upload) throw new ForbiddenException("The student has not uploaded this file");

        console.log({ printing_job_id: printing_job_id, file: file });

        const student = await this.prisma.sTUDENT.update({
            where: {
                student_id: dto.student_id,
            },
            data: {
                prints: {
                    create: {
                        printing_job_id: printing_job_id,
                        printer_id: dto.printer_id,
                        file_id: (await file).file_id,
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

        return await this.prisma.pRINTS.findUnique({
            where: {
                student_id: dto.student_id,
                printer_id: dto.printer_id,
                printing_job_id: printing_job_id,
                file_id: (await file).file_id,
            }
        });
    }

    pagesValidate(pages: string): number {
        // Regular expression for a valid page or range
        const pageRegex = /^\d+$/; // Matches a single page (e.g., "11")
        const rangeRegex = /^(\d+)-(\d+)$/; // Matches a range (e.g., "1-10")

        let totalPages = 0;

        // Split the input by commas and trim whitespace
        const parts = pages.split(",").map(part => part.trim());

        for (const part of parts) {
            if (pageRegex.test(part)) {
                // Valid single page, add 1 to total pages
                totalPages += 1;
            } else {
                const rangeMatch = rangeRegex.exec(part);
                if (rangeMatch) {
                    const start = parseInt(rangeMatch[1], 10);
                    const end = parseInt(rangeMatch[2], 10);

                    if (start > end) {
                        // Invalid range: start is greater than end
                        return -1;
                    }

                    // Add the number of pages in the range
                    totalPages += (end - start + 1);
                } else {
                    // If it doesn't match either a page or range, it's invalid
                    return -1;
                }
            }
        }

        // Return the total number of pages
        return totalPages;
    }

    async getPrintsByTime(student_id: string, start_time: string, end_time: string) {
        try {
            const prints = await this.prisma.pRINTS.findMany({
                where: {
                    student_id: student_id,
                    start_time: {
                        gte: new Date(start_time), // Start time greater than or equal to the provided start time
                    },
                    end_time: {
                        lte: new Date(end_time), // End time less than or equal to the provided end time
                    },
                },
                include: {
                    student: true,   // Include the student details if needed
                    printer: true,   // Include printer details if needed
                    file: true,      // Include file details if needed
                },
            });

            return prints;
        } catch (error) {
            console.error("Error fetching prints:", error);
            throw new Error("Unable to fetch prints by time.");
        }
    }


    async getPrintsPagesTime(student_id: string, start_time: string, end_time: string) {
        try {
            const prints = await this.prisma.pRINTS.findMany({
                where: {
                    student_id: student_id,
                    start_time: {
                        gte: new Date(start_time), // Start time greater than or equal to the provided start time
                    },
                    end_time: {
                        lte: new Date(end_time), // End time less than or equal to the provided end time
                    },
                    state: Printing_states.Succesful,
                },
            });

            // Initialize an object to store the total pages per page type
            const totalPagesByType = {
                A2: 0,
                A3: 0,
                A4: 0,
                A5: 0,
                Letter: 0,
            };

            // Loop through the prints and accumulate pages by type
            prints.forEach((print) => {
                const pages = this.pagesValidate(print.pages); // Assuming pages are separated by commas

                const pageType = print.page_type; // Get the page type (A2, A3, A4, A5, Letter)

                // Add the number of pages to the corresponding page type
                if (totalPagesByType[pageType] !== undefined) {
                    totalPagesByType[pageType] += pages;
                }
            });

            return totalPagesByType;
        }
        catch (error) {
            console.error("Error fetching print pages by time:", error);
            throw new Error("Unable to fetch print pages by time.");
        }
    }
}
