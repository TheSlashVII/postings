import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthenticationModule } from '@nestjs/authentication';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
// loads the .env file in the root folder for the backend
process.loadEnvFile()
export const defaultDbConfig = {
  type: 'mysql',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.MYSQL_HOST) ?? 3306,
  username: process.env.MYSQL_USER ?? "postings_user",
  password: process.env.MYSQL_PASSWORD ?? "@zum448bum9m1@",
  database: process.env.MYSQL_DATABASE ?? "postings_db",
  entities: [],
  synchronize: false,
}
@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? '',
      appSecret: process.env.OBSERVE_APP_SECRET ?? '',
      runtimeMetrics: !Boolean(process.versions?.['webcontainer']),
      serviceId: 'postings_backend',
    }),
    AuthenticationModule.forRoot({
      accessToken: {
        key: process.env.JWT_SECRET!,
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
    })


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
