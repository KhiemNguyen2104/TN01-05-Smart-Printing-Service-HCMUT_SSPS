import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import * as argon from 'argon2';
import { Page_types } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    // Getting functions
    async findUserById(in_user_id: string): Promise<any> {
        try {
            const user = await this.prisma.uSER.findUnique({
                where: {
                    user_id: in_user_id,
                },
                include: {
                    students: true,
                }
            })

            delete user.hash_key;
            return user;
        }
        catch (error) {
            throw error;
        }
    }

    async findUserByEmail(in_user_email: string): Promise<any> {
        try {
            const user = await this.prisma.uSER.findUnique({
                where: {
                    user_email: in_user_email,
                }
            })

            delete user.hash_key;
            return user;
        }
        catch (error) {
            throw error;
        }
    }

    async findUserByName(
        in_user_name: string,
        in_orderBy: undefined | "user_id" | "user_name" | "user_email" = undefined,
        asc: boolean = true,
    ): Promise<any> {
        try {
            const users = await this.prisma.uSER.findMany({
                where: {
                    user_name: in_user_name,
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            for (let user of users) {
                delete user.hash_key;
            }

            return users;
        }
        catch (error) {
            throw error;
        }
    }

    async findUserByYear(
        in_user_year: "17" | "18" | "19" | "22" | "21" | "23" | "20" | "00",
        in_orderBy: undefined | "user_id" | "user_name" | "user_email" = undefined,
        asc: boolean = true,
    ): Promise<any> {
        try {
            const users = await this.prisma.uSER.findMany({
                where: {
                    user_id: { startsWith: in_user_year },
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            for (let user of users) {
                delete user.hash_key;
            }

            return users;
        }
        catch (error) {
            throw error;
        }
    }

    async findStudentByRemainingPages(
        floor: number,
        ceil: number,
        type: Page_types,
        in_orderBy: undefined | "student_id" | "remaining_pages" = undefined,
        asc: boolean = true,
    ): Promise<any> {
        try {
            if (ceil < floor) throw new ForbiddenException("Invalid range, the ceiling must greater than or equal to the floor.");

            const student = await this.prisma.sTUDENT.findMany({
                where: {
                    ...(type == Page_types.A2 && {remaining_A2_pages: {
                        gte: floor,
                        lte: ceil,
                    }}),
                    ...(type == Page_types.A3 && {remaining_A3_pages: {
                        gte: floor,
                        lte: ceil,
                    }}),
                    ...(type == Page_types.A4 && {remaining_A4_pages: {
                        gte: floor,
                        lte: ceil,
                    }}),
                    ...(type == Page_types.A5 && {remaining_A5_pages: {
                        gte: floor,
                        lte: ceil,
                    }}),
                    ...(type == Page_types.Letter && {remaining_Letter_pages: {
                        gte: floor,
                        lte: ceil,
                    }})
                },
                ...(in_orderBy && {
                    orderBy: {
                        [in_orderBy]: asc ? "asc" : "desc",
                    },
                }),
            })

            return student;
        }
        catch (error) {
            throw error;
        }
    }

    async findSPSO(spso_id: string) {
        try {
            const spso = await this.prisma.sPSO.findUnique({
                where: {
                    SPSO_id: spso_id,
                },
            })

            return spso;
        }
        catch (error) {
            throw error;
        }
    }

    // Setting functions

    async updateUser(dto: UpdateUserDto) {
        try {
            if (!dto.user_id && !dto.user_email) {
                throw new ForbiddenException("An ID or an email is required for updating");
            }
        
            // Determine the `where` clause dynamically
            const whereCondition = dto.user_id
                ? { user_id: dto.user_id }
                : { user_email: dto.user_email };
        
            // Build the `data` object dynamically
            const dataToUpdate = {
                ...(dto.user_email && { user_email: dto.user_email }),
                ...(dto.user_name && { user_name: dto.user_name }),
                ...(dto.user_password && { hash_key: await argon.hash(dto.user_password) }),
            };
        
            // Perform the update
            const updatedUser = await this.prisma.uSER.update({
                where: whereCondition,
                data: dataToUpdate,
            });
        
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }

    async getAllFiles(user_id: string) {
        return await this.prisma.uSER.findUnique({
            where: {
                user_id: user_id,
            },
            select: {
                students: {
                    select: {
                        student_id: true,
                        remaining_A2_pages: true,
                        remaining_A3_pages: true,
                        remaining_A4_pages: true,
                        remaining_A5_pages: true,
                        remaining_Letter_pages: true,
                        upload: {
                            select: {
                                time: true,
                                file: {
                                    select: {
                                        file_id: true,
                                        file_name: true,
                                        file_type: true,
                                        file_size: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }        
}
