import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * Prisma服务类 - 数据库连接管理
 * @Injectable() 表示这个类可以被NestJS注入到其他组件中
 * 继承自PrismaClient以获得所有数据库操作方法
 * 实现OnModuleInit和OnModuleDestroy接口以管理数据库连接的生命周期
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * 模块初始化时连接数据库
   * 在应用启动时自动调用
   * 
   * this.$connect() 是Prisma提供的连接数据库的方法
   * 它会根据 schema.prisma 中的配置自动连接到PostgreSQL数据库
   */
  async onModuleInit() {
    await this.$connect()
  }

  /**
   * 模块销毁时断开数据库连接
   * 在应用关闭时自动调用
   * 
   * this.$disconnect() 是Prisma提供的断开连接的方法
   * 确保应用优雅关闭，防止连接泄漏
   */
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
