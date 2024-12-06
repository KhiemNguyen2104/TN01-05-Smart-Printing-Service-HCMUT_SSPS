import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthSignUpDto, AuthLoginDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    async login(dto: AuthLoginDto) {
        dto.email = dto.email + '@hcmut.edu.vn';

        const user = await this.prisma.uSER.findUnique({
            where: {
                user_email: dto.email
            }
        });

        if (!user) throw new ForbiddenException('The account does not exist, please sign up first.');

        const pwMatch = await argon.verify(user.hash_key, dto.password);
        if (!pwMatch) throw new ForbiddenException('Invalid password.');

        return this.signToken(user.user_id, user.user_email);
    }

    async signup(dto: AuthSignUpDto) {
        try {
            const user = await this.prisma.uSER.findUnique({
                where: {
                    user_id: dto.id
                }
            });
            
            if (user) throw new ForbiddenException('The account existed!');

            const hash = await argon.hash(dto.password)

            const new_user = this.prisma.uSER.create({
                data: {
                    user_id: dto.id,
                    user_name: dto.name,
                    user_email: dto.email,
                    hash_key: hash,
                }
            })
            
            return this.signToken((await new_user).user_id, (await new_user).user_email);

        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async signToken(user_id: string, user_email: string): Promise<{access_token: string}> {
        let user_type = ""
        if (user_id.substring(0, 1) == "00") user_type = "SPSO";
        else user_type = "student";
        
        const payload = {
            sub: user_id,
            user_email,
            user_type,
        }

        const secret = process.env.JWT_SECRET;

        try {
            const token = await this.jwt.signAsync(payload, {
              expiresIn: '15m',
              secret: secret,
            });

            return {access_token: token};
        }
        catch (error) {
            throw new Error('Error signing the token');
        }
    }
}
