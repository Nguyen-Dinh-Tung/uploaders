import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({})
export class JwtModuleDynamic {
  static registerAsync(secret: string): DynamicModule {
    return {
      module: JwtModuleDynamic,
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            global: true,
            secret: configService.get<string>(secret),
            signOptions: {
              expiresIn: '30d',
            },
          }),
        }),
      ],
      providers: [],
      exports: [JwtModule],
    };
  }
}
