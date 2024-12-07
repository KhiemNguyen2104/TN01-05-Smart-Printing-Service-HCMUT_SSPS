import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, PrinterModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
