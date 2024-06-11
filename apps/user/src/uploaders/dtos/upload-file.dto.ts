import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ type: String, format: 'binary' })
  @ApiPropertyOptional()
  @IsOptional()
  file?;
}
