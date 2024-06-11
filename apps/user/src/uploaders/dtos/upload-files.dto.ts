import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadFilesDto {
  @ApiProperty({ type: Array, format: 'binary' })
  @ApiPropertyOptional()
  @IsOptional()
  files?;
}
