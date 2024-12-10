import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { AuthGuard } from '@nestjs/passport';
import { NewPrinterDto, PrintingJobDto, PrintingJobUpdateDto } from './dto';
import { get } from 'http';
import { start } from 'repl';

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

    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    async getAllPrinters() {
        return this.printersevice.getAllPrinters();
    }

    @Post('prints')
    @UseGuards(AuthGuard('jwt'))
    async prints(@Body() dto: PrintingJobDto) {
        return await this.printersevice.prints(dto);
    }

    @Put('prints/commit')
    @UseGuards(AuthGuard('jwt'))
    async printsCommit(@Body() dto: PrintingJobUpdateDto) {
        return await this.printersevice.printsCommit(dto);
    }

    @Get('prints/history/:id')
    @UseGuards(AuthGuard('jwt'))
    async getPrintsByTime(
        @Param('id') student_id: string,
        @Query('start_time') start_time: string,
        @Query('end_time') end_time: string,
    ) {
        return this.printersevice.getPrintsByTime(student_id, start_time, end_time);
    }

    @Get('prints/pages/:id')
    @UseGuards(AuthGuard('jwt'))
    async getPrintsPagesTime(
        @Param('id') student_id: string,
        @Query('start_time') start_time: string,
        @Query('end_time') end_time: string,
    ) {
        return this.printersevice.getPrintsPagesTime(student_id, start_time, end_time);
    }
}
