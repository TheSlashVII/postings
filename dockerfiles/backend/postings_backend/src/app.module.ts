import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthenticationModule } from '@nestjs/authentication';
import { UserModule } from './user/user.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
// loads the .env file in the root folder for the backend
try {
  process.loadEnvFile()
} catch (error) {
  console.warn("No env file found inside the image. Using values defined in the compose.yaml file or default values.")
}
export const defaultDbConfig = {
  type: 'mysql',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.MYSQL_PORT) ?? 3306,
  username: process.env.MYSQL_USER ?? "postings_user",
  password: process.env.MYSQL_PASSWORD ?? "@zum448bum9m1@",
  database: process.env.MYSQL_DATABASE ?? "postings_db",
  entities: [],
  synchronize: false,
}
@Module({
  imports: [
    AuthenticationModule.forRoot({
      accessToken: {
        key: process.env.JWT_SECRET ?? "uffrngcN/CGQBjtHWAM728QCNH+73WzwakmE5C/6ovM=",
        issuer: "http://postings.net",
        audience: "full-app",
        ttl: "3h"
      },
      refreshToken: false
    })
    ,
    AuthModule,
    // orm configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST ?? 'localhost',
      port: Number(process.env.MYSQL_HOST) ?? 3306,
      username: process.env.MYSQL_USER ?? "postings_user",
      password: process.env.MYSQL_PASSWORD ?? "@zum448bum9m1@",
      database: process.env.MYSQL_DATABASE ?? "postings_db",
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
