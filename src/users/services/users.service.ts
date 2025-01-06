import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDto, UserStatus } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import type { Prisma } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      status: createUserDto.status ?? UserStatus.Inactivated,
    }
    return this.prisma.user.create({ data })
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user)
      throw new NotFoundException(`User with ID ${id} not found`)

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = updateUserDto
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }

  async activate(id: number) {
    const data: Prisma.UserUpdateInput = {
      status: Number(UserStatus.Activated),
    }
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async deactivate(id: number) {
    const data: Prisma.UserUpdateInput = {
      status: Number(UserStatus.Inactivated),
    }
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }
} 