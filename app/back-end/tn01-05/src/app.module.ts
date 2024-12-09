import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrinterModule } from './printer/printer.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, PrinterModule, FileModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
