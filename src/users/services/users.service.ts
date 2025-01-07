import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserStatusEnum } from '../enums/user.enum'
import type { Prisma } from '@prisma/client'

/**
 * 用户服务类 - 处理所有与数据库相关的操作
 * @Injectable() 表示这个类可以被NestJS注入到其他组件中
 */
@Injectable()
export class UsersService {
  // prisma 是数据库ORM工具，用于操作PostgreSQL数据库
  constructor(private prisma: PrismaService) {}

  /**
   * 创建新用户
   * @param createUserDto 包含用户信息的数据传输对象
   * @returns Promise<User> 返回创建的用户信息
   * 
   * Prisma.UserCreateInput 是由Prisma自动生成的类型，
   * 用于确保创建用户时的数据结构符合数据库表结构
   */
  async create(createUserDto: CreateUserDto) {
    // 构建要插入数据库的用户数据
    const data: Prisma.UserCreateInput = {
      ...createUserDto, // 展开操作符，复制所有用户提交的数据
      status: createUserDto.status ?? UserStatusEnum.Inactivated, // 如果未提供状态，默认为未激活
    }
    // prisma.user.create() 会生成 INSERT SQL 语句
    return this.prisma.user.create({ data })
  }

  /**
   * 获取所有用户列表
   * @returns Promise<User[]> 返回用户数组
   * 
   * prisma.user.findMany() 会生成 SELECT * FROM users SQL语句
   */
  async findMany() {
    return this.prisma.user.findMany()
  }

  /**
   * 根据ID查找单个用户
   * @param id 用户ID
   * @throws NotFoundException 当用户不存在时抛出404错误
   * @returns Promise<User> 返回查找到的用户信息
   * 
   * prisma.user.findUnique() 会生成 SELECT * FROM users WHERE id = ? SQL语句
   */
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }, // WHERE 条件
    })

    if (!user)
      throw new NotFoundException(`User with ID ${id} not found`)

    return user
  }

  /**
   * 更新用户信息
   * @param id 要更新的用户ID
   * @param updateUserDto 要更新的字段和值
   * @returns Promise<User> 返回更新后的用户信息
   * 
   * Prisma.UserUpdateInput 是Prisma生成的类型，确保更新的数据符合表结构
   * prisma.user.update() 会生成 UPDATE users SET ... WHERE id = ? SQL语句
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = updateUserDto
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  /**
   * 删除用户
   * @param id 要删除的用户ID
   * @returns Promise<User> 返回被删除的用户信息
   * 
   * prisma.user.delete() 会生成 DELETE FROM users WHERE id = ? SQL语句
   */
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }

  /**
   * 激活用户
   * @param id 用户ID
   * @returns 更新后的用户信息
   */
  async activate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { status: UserStatusEnum.Activated }, // 设置为 1
    })
  }

  /**
   * 停用用户
   * @param id 用户ID
   * @returns 更新后的用户信息
   */
  async deactivate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { status: UserStatusEnum.Inactivated }, // 设置为 0
    })
  }
} 