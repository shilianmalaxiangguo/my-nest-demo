// src/app.module.ts
import type { MiddlewareConsumer, NestModule } from '@nestjs/common' // 导入 NestJS 的 MiddlewareConsumer 和 NestModule 类型
import { Module } from '@nestjs/common' // 导入 NestJS 的 Module 装饰器
import { HttpModule } from '@nestjs/axios' // 导入 HttpModule，用于处理 HTTP 请求
import { AppController } from './app.controller' // 导入应用控制器
import { AppService } from './app.service' // 导入应用服务
import { UsersModule } from './users/users.module' // 导入用户模块
import { PrismaService } from './prisma/prisma.service' // 导入 Prisma 服务，用于数据库交互
import { LoggerMiddleware } from './middleware/logger.middleware' // 导入日志中间件
import { ProxyMiddleware } from './middleware/proxy.middleware' // 导入代理中间件

@Module({
  imports: [
    HttpModule, // 注册 HttpModule
    UsersModule // 注册 UsersModule
  ],
  controllers: [AppController], // 注册应用控制器
  providers: [AppService, PrismaService], // 注册应用服务和 Prisma 服务
})
export class AppModule implements NestModule { // 定义 AppModule 类并实现 NestModule 接口
  configure(consumer: MiddlewareConsumer) { // 配置中间件
    consumer
      .apply(ProxyMiddleware, LoggerMiddleware) // 应用代理和日志中间件
      .forRoutes('*') // 为所有路由应用中间件
  }
}