import { Module } from '@nestjs/common';
import { UploadersService } from './uploaders.service';
import { UploadersController } from './uploaders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from '@app/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
  controllers: [UploadersController],
  providers: [UploadersService],
})
export class UploadersModule {}
