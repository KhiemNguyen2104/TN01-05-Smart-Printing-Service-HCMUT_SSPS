import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostgresqlService } from './postgresql/postgresql.service';
import { PostgresqlController } from './postgresql/postgresql.controller';
import { PostgresqlModule } from './postgresql/postgresql.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [UserModule, PostgresqlModule, AuthModule, PrismaModule, PrinterModule],
  controllers: [AppController, PostgresqlController],
  providers: [AppService, PostgresqlService, PrismaService],
})
export class AppModule {}
