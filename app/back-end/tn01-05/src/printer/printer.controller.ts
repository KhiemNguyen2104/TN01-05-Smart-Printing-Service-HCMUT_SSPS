import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { AuthGuard } from '@nestjs/passport';
import { NewPrinterDto } from './dto';

@Controller('printer')
export class PrinterController {
    constructor(private printersevice: PrinterService) { }

    @Post('new')
    @UseGuards(AuthGuard('jwt'))
    async addNewPrinter(@Body() dto: NewPrinterDto) {
        return await this.printersevice.addNewPrinter(dto);
    }

    @Get('id/:id')
    @UseGuards(AuthGuard('jwt'))
    async findPrinterById(@Param('id') printer_id: string): Promise<any> {
        return this.printersevice.findPrinterById(printer_id);
    }

    @Get('name')
    @UseGuards(AuthGuard('jwt'))
    async findPrinterByName(
        @Query('name') printer_name: string,
        @Query('orderBy') orderBy: undefined | "printer_id" | "printer_name" | "manufacturer" | "location",
        @Query('asc') asc: undefined | "true" | "false"
    ) {
        let flag = (asc == "false") ? false : true;

        return this.printersevice.findPrinterByName(printer_name, orderBy, flag);
    }

    @Get('manufacturer')
    @UseGuards(AuthGuard('jwt'))
    async findPrinterByManufacturer(
        @Query('manufacturer') manufacturer: string,
        @Query('orderBy') orderBy: undefined | "printer_id" | "printer_name" | "manufacturer" | "location",
        @Query('asc') asc: undefined | "true" | "false"
    ) {
        let flag = (asc == "false") ? false : true;

        return this.printersevice.findPrinterByManufacturer(manufacturer, orderBy, flag);
    }


}
