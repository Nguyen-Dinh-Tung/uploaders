import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadersService } from './uploaders.service';
import { ValidatorFilesPipe } from '@app/common/pipe';
import { FileMimeTypes } from '@app/common/constants';
import { UploadFilesDto } from './dtos/upload-files.dto';
import { UploadFileDto } from './dtos/upload-file.dto';

@Controller('uploaders')
@ApiTags('Uploaders')
@ApiBearerAuth()
export class UploadersController {
  constructor(private readonly uploadersService: UploadersService) {}

  @Post('single')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async singleUpload(
    @Body() data: UploadFileDto,
    @UploadedFile(new ValidatorFilesPipe(FileMimeTypes))
    file: Express.Multer.File,
  ) {
    return await this.uploadersService.singleUpload(file);
  }

  @Post('bulk')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  @ApiConsumes('multipart/form-data')
  async bulkUpload(
    @Body() data: UploadFilesDto,
    @UploadedFiles(new ValidatorFilesPipe(FileMimeTypes))
    files?: Express.Multer.File[],
  ) {
    return await this.uploadersService.bulkUpload(files);
  }
}
