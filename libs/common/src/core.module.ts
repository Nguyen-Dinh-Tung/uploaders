import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptions } from './database';
import { UserAdminEntity } from './entities';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { ConfigModule } from '@nestjs/config';
@Module({})
@Global()
export class CoreModule {
  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useClass: DatabaseOptions,
        }),
        //   Push entity use global
        TypeOrmModule.forFeature([UserAdminEntity]),
      ],
      providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
      exports: [TypeOrmModule],
    };
  }
}
