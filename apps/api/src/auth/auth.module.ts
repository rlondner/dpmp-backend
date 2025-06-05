import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../objectmodel/session/session.module';
import { UsersModule } from '../objectmodel/users_custom/users.module';
import { LoggerModule } from '@nestjs-logger/shared/logger/infrastructure/nestjs/loggerModule';
import { LogConfigModule } from '@nestjs-logger/shared/config/infrastructure/nestjs/configModule';
import { LogContextModule } from '@nestjs-logger/shared/context/infrastructure/nestjs/contextModule';

@Module({
  imports: [
    LoggerModule, LogConfigModule, LogContextModule,
    UsersModule,
    SessionModule,
    PassportModule,
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
