import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {getJwtConfig} from "../config/jwt.config";
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";
import {GoogleStrategy} from "./startegies/google.strategy";
import {JwtStrategy} from "./startegies/jwt.strategy";
import {YandexStrategy} from "./startegies/yandex.strategy";

@Module({
    imports: [
      UserModule,
      ConfigModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getJwtConfig
      })
    ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, GoogleStrategy, JwtStrategy, YandexStrategy],
})
export class AuthModule {}
