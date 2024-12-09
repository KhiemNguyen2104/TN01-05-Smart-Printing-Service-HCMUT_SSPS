import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { UploadFileDto } from './dto';
import { File_types } from '@prisma/client';

@Controller('file')
export class FileController {
    constructor (private fileservice: FileService) {}

    @Post('upload')
    @UseGuards(AuthGuard('jwt'))
    async UploadNewFile(@Body() dto: UploadFileDto) {

        return await this.fileservice.UploadNewFile(dto);
    }
    // async UploadNewFile(@Body() data: [dto: UploadFileDto]) {
    //     console.log(data);

    //     return await this.fileservice.UploadNewFiles(data);
    // }

    @Get('name')
    @UseGuards(AuthGuard('jwt'))
    async FindFileByName(
        @Query('name') file_name: string,
        @Query('orderBy') orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        @Query('asc') asc:  undefined | "true" | "false"
    ) {
        let flag = (asc == "false") ? false : true;

        return await this.fileservice.findFileByName(file_name, orderBy, flag);
    }

    @Get('type')
    @UseGuards(AuthGuard('jwt'))
    async FindFileByType(
        @Query('type') file_type: string,
        @Query('orderBy') orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        @Query('asc') asc:  undefined | "true" | "false"
    ) {
        let flag = (asc == "false") ? false : true;
        let type = undefined;

        file_type = file_type.toLowerCase();

        switch (file_type) {
            case "pdf":
                type = File_types.PDF;
                break;
            case "doc":
                type = File_types.DOC;
                break;
            case "docx":
                type = File_types.DOCX;
                break;
            case "xlsx":
                type = File_types.XLSX;
                break;
            case "jpeg":
                type = File_types.JPEG;
                break;
            case "png":
                type = File_types.PNG;
                break;
            case "ppt":
                type = File_types.PPT;
                break;
            case "pptx":
                type = File_types.PPTX;
                break;
            default:
                break;
        }

        return await this.fileservice.findFileByType(type, orderBy, flag);
    }

    @Get('time')
    @UseGuards(AuthGuard('jwt'))
    async FindFileByUploadTime(
        @Query('start_time') start_time: string,
        @Query('end_time') end_time: string,
        @Query('orderBy') orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        @Query('asc') asc:  undefined | "true" | "false"
    ) {
        start_time = (new Date(start_time)).toISOString();
        end_time = (new Date(end_time)).toISOString();
        let flag = (asc == "false") ? false : true;

        return await this.fileservice.findFileByNUploadTime(start_time, end_time, orderBy, flag);
    }
}
