import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdminController } from './user-admin.controller';
import { UserAdminService } from './user-admin.service';
import { UserAdminEntity } from '@app/common/entities';
import { UploadersModule } from '../uploaders/uploaders.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAdminEntity]), UploadersModule],
  controllers: [UserAdminController],
  providers: [UserAdminService],
  exports: [UserAdminService],
})
export class UserAdminModule {}
