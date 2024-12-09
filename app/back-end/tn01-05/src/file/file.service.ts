import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileDto } from './dto';
import * as argon from 'argon2';
import { File_types } from '@prisma/client';

@Injectable()
export class FileService {
    constructor (private prisma: PrismaService) {}

    async UploadNewFile(dto: UploadFileDto) {
        try {
            let fileId = await argon.hash(dto.file_name + " " + dto.file_type);
            
            const student = await this.prisma.sTUDENT.findUnique({
                where: {
                    student_id: dto.student_id
                }
            })

            if (!student) throw new ForbiddenException("Cannot upload this file because of an invalid student ID");

            const system_policy = await this.prisma.sYSTEM_POLICY.findUnique({
                where: {
                    SP_id: 'SP1'
                }
            })

            if (!system_policy) {
                if (dto.file_size/1024 > 200) throw new ForbiddenException("The file is too large for uploading");
            }
            else {
                if (dto.file_size/1024 > system_policy.max_file_size) throw new ForbiddenException("The file is too large for uploading");
            }

            const file = await this.prisma.fILE.create({
                data: {
                    file_id: fileId,
                    file_size: dto.file_size,
                    file_name: dto.file_name,
                    file_type: dto.file_type,
                }
            })

            const UploadTime = (new Date).toISOString();

            const uploads = await this.prisma.uPLOADS.create({
                data: {
                    student_id: dto.student_id,
                    file_id: file.file_id,
                    time: UploadTime,
                }
            })

            await this.prisma.sTUDENT.update({
                where: {
                    student_id: dto.student_id,
                },
                data: {
                    upload: {
                        connect: {
                            student_id_file_id_time: {
                                student_id: dto.student_id,
                                file_id: file.file_id,
                                time: UploadTime,
                            },
                        }
                    }
                }
            })

            await this.prisma.fILE.update({
                where: {
                    file_id: fileId,
                },
                data: {
                    uploads: {
                        connect: {
                            student_id_file_id_time: {
                                student_id: dto.student_id,
                                file_id: file.file_id,
                                time: UploadTime,
                            },
                        }
                    }
                }
            })

            return file;
        }
        catch (error) {
            throw error;
        }
    }

    async UploadNewFiles(data: [dto: UploadFileDto]) {
        for (let record of data) {
            await this.UploadNewFile(record);
        }

        return data;
    }

    async findFileByName(
        in_file_name: string,
        in_orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        asc: boolean = true,
    ) {
        try {
            const files = this.prisma.fILE.findMany({
                where: {
                    file_name: in_file_name,
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            return files;
        }
        catch (error) {
            throw error;
        }
    }

    async findFileByType(
        in_file_type: File_types,
        in_orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        asc: boolean = true,
    ) {
        try {
            const files = this.prisma.fILE.findMany({
                where: {
                    file_type: in_file_type,
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            return files;
        }
        catch (error) {
            throw error;
        }
    }

    async findFileByNUploadTime(
        in_start_time: string,
        in_end_time: string,
        in_orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        asc: boolean = true,
    ) {
        try {
            const files = this.prisma.fILE.findMany({
                where: {
                    uploads: {
                        some: {
                            time: {
                                gte: new Date(in_start_time),
                                lte: new Date(in_end_time),
                            }
                        }
                    }
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            return files;
        }
        catch (error) {
            throw error;
        }
    }
}
