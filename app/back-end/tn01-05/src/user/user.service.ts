import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
        in_orderBy: undefined | "student_id" | "remaining_pages" = undefined,
        asc: boolean = true,
    ): Promise<any> {
        try {
            if (ceil < floor) throw new ForbiddenException("Invalid range, the ceiling must greater than or equal to the floor.");

            const student = await this.prisma.sTUDENT.findMany({
                where: {
                    remaining_pages: {
                        gte: floor,
                        lte: ceil,
                    }
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

    // async updateUserByID(user_id: string, )
}
