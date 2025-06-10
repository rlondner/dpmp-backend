import { Module } from '@nestjs/common';

import { FilesModule } from './objectmodel/files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './objectmodel/files/config/file.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './objectmodel/session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { LoggerModule } from '@nestjs-logger/shared/logger/infrastructure/nestjs/loggerModule';
import { LogConfigModule } from '@nestjs-logger/shared/config/infrastructure/nestjs/configModule';
import { LogContextModule } from '@nestjs-logger/shared/context/infrastructure/nestjs/contextModule';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { UsersModule } from './objectmodel/users_custom/users.module';

const envPath = [`.${process.env.NODE_ENV?.trim() || 'development'}.env`];
console.log('envFilePath:', envPath); // ✅ This will now work

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
  envFilePath: envPath,
});

import { OrganizationsModuleBase } from './objectmodel/organizations/organizations.module';

import { AddressesModuleBase } from './objectmodel/addresses/addresses.module';

import { StatusesModuleBase } from './objectmodel/statuses/statuses.module';

import { UsersModuleBase } from './objectmodel/users/users.module';

import { UserRolesModuleBase } from './objectmodel/user-roles/user-roles.module';

import { PermissionsModuleBase } from './objectmodel/permissions/permissions.module';

import { PermissionsModuleBase } from './objectmodel/permissions/permissions.module';

import { UserRolesModuleBase } from './objectmodel/user-roles/user-roles.module';

import { UsersModuleBase } from './objectmodel/users/users.module';

@Module({
  imports: [
    UsersModuleBase,
    UserRolesModuleBase,
    PermissionsModuleBase,
    UsersModuleBase,
    UserRolesModuleBase,
    PermissionsModuleBase,

    StatusesModuleBase,
    AddressesModuleBase,
    OrganizationsModuleBase,

    LoggerModule,
    LogConfigModule,
    LogContextModule,
    configModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
    //   //envFilePath: ['.${process.env.NODE_ENV.trim()}.env'],
    //   envFilePath: [`.${process.env.NODE_ENV?.trim() || 'development'}.env`],

    //}),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
