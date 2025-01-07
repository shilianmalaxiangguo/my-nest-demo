import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { ProxyMiddleware } from './middleware/proxy.middleware'

@Module({
  imports: [
    HttpModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware, LoggerMiddleware)
      .forRoutes('*')
  }
}
