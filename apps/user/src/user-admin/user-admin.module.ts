import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdminController } from './user-admin.controller';
import { UserAdminService } from './user-admin.service';
import { UserAdminEntity } from '@app/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserAdminEntity])],
  controllers: [UserAdminController],
  providers: [UserAdminService],
  exports: [UserAdminService],
})
export class UserAdminModule {}
