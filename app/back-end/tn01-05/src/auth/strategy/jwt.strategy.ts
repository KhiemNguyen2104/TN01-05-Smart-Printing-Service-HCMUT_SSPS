import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: {
        sub: string,
        user_email: string,
        user_type: string,
    }) {
        const user = await this.prisma.uSER.findUnique({
            where: {
                user_id: payload.sub,
            },
        });

        delete user.hash_key;
        return user;
    }
}