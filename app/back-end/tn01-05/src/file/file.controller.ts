import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { UploadFileDto } from './dto';
import { File_types } from '@prisma/client';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
    constructor(private fileservice: FileService) { }

    @Post('upload')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, callback) => {
                const studentId = req.body.student_id; // Extract student_id from the request body
                const destinationPath = `./uploads/${studentId}`;

                // Ensure the directory exists
                if (!existsSync(destinationPath)) {
                    mkdirSync(destinationPath, { recursive: true });
                }

                callback(null, destinationPath);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = file.originalname;
                const ext = extname(file.originalname);
                callback(null, `${uniqueSuffix}`);
            },
        }),
        limits: { fileSize: 200 * 1024 * 1024 }, // 5 MB limit
    }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { student_id: string }
    ) {

        let type = undefined;

        switch (extname(file.originalname).substring(1) as any) {
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

        const uploadFileDto: UploadFileDto = {
            student_id: body.student_id,
            file_name: file.originalname,
            file_type: type, // File extension as type
            file_size: file.size,
        };

        return this.fileservice.UploadNewFile(uploadFileDto);
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
        @Query('asc') asc: undefined | "true" | "false"
    ) {
        let flag = (asc == "false") ? false : true;

        return await this.fileservice.findFileByName(file_name, orderBy, flag);
    }

    @Get('type')
    @UseGuards(AuthGuard('jwt'))
    async FindFileByType(
        @Query('type') file_type: string,
        @Query('orderBy') orderBy: undefined | "file_name" | "file_type" | "file_size" = undefined,
        @Query('asc') asc: undefined | "true" | "false"
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
        @Query('asc') asc: undefined | "true" | "false"
    ) {
        start_time = (new Date(start_time)).toISOString();
        end_time = (new Date(end_time)).toISOString();
        let flag = (asc == "false") ? false : true;

        return await this.fileservice.findFileByNUploadTime(start_time, end_time, orderBy, flag);
    }

    @Get('print')
    @UseGuards(AuthGuard('jwt'))
    async serveFile(
        @Query('file_name') filename: string,
        @Res() res: Response,
        @Query('student_id') student_id: string,
    ) {
        const filePath = join(__dirname, '..', '..', 'uploads/' + student_id, filename);
        
        if (!existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.sendFile(filePath);
    }
}
