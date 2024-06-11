import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModuleDynamic } from '@app/common/jwt';
import { EnvVariable } from '@app/common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule.forRoot(),
    JwtModuleDynamic.registerAsync(EnvVariable.SECRET_KEY),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
