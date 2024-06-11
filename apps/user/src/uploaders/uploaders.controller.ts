import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('uploaders')
@ApiTags('Uploaders')
@ApiBearerAuth()
export class UploadersController {
  @Post('single')
  async singleUpload() {}

  @Post('bulk')
  async bulkUpload() {}
}
