import { Module, OnModuleInit } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreModule, ServeStaticDynamic } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModuleDynamic } from '@app/common/jwt';
import { EnvVariable } from '@app/common/constants';
import { UploadersModule } from './uploaders/uploaders.module';
import { AuthModule } from './auth/auth.module';
import { UserAdminService } from './user-admin/user-admin.service';
import { UserAdminModule } from './user-admin/user-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule.forRoot(),
    JwtModuleDynamic.registerAsync(EnvVariable.SECRET_KEY),
    UploadersModule,
    ServeStaticDynamic.register(EnvVariable.SERVER_STATIC_USER),
    AuthModule,
    UserAdminModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userAdminService: UserAdminService) {}
  async onModuleInit() {
    const user = await this.userAdminService.findOne(
      process.env.ADMIN_USERNAME,
    );

    if (!user) {
      return await this.userAdminService.createAdminUser(
        process.env.ADMIN_USERNAME,
        process.env.ADMIN_PASSWORD,
      );
    }
  }
}
