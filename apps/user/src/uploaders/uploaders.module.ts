import { Module } from '@nestjs/common';
import { UploadersService } from './uploaders.service';
import { UploadersController } from './uploaders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from '@app/common/entities';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagesEntity]),
    MulterModule.register({
      dest: './uploads/images/',
      limits: {
        fieldSize: Infinity,
      },
    }),
  ],
  controllers: [UploadersController],
  providers: [UploadersService],
})
export class UploadersModule {}
