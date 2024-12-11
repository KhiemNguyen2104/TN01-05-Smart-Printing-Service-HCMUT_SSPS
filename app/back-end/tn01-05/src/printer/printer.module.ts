import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, FileModule],
  controllers: [PrinterController],
  providers: [PrinterService]
})
export class PrinterModule {}
