// src/users/users.module.ts
import { Module } from '@nestjs/common' // 导入 NestJS 的 Module 装饰器
import { UsersController } from './controllers/users.controller' // 导入用户控制器
import { UsersService } from './services/users.service' // 导入用户服务
import { PrismaService } from '../prisma/prisma.service' // 导入 Prisma 服务，用于数据库交互

@Module({
  controllers: [UsersController], // 注册用户控制器
  providers: [UsersService, PrismaService], // 注册用户服务和 Prisma 服务
})
export class UsersModule {} // 导出 UsersModule 类