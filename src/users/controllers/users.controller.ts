import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  BadRequestException,
} from '@nestjs/common'
import { isEmpty, isNil } from 'lodash'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserStatusEnum, UserGenderEnum } from '../enums/user.enum'
import { ResultCodeEnum } from '../../types/enums'
import { sendResponse } from '../../utils/response'
import { handleError } from '../../utils/error'

/**
 * 用户控制器
 * 处理所有与用户相关的HTTP请求
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 验证用户字段
   * @param data 用户数据
   * @throws BadRequestException 当验证失败时抛出
   */
  private validateFields(data: Partial<CreateUserDto>) {
    const validations = [
      {
        condition: !isNil(data.status) && !Object.values(UserStatusEnum).includes(data.status),
        message: `激活状态只能是 ${UserStatusEnum.Activated}(已激活) 或 ${UserStatusEnum.Inactivated}(未激活)`,
      },
      {
        condition: !isNil(data.gender) && !Object.values(UserGenderEnum).includes(data.gender),
        message: `性别只能是 ${UserGenderEnum.Male}(男), ${UserGenderEnum.Female}(女) 或 ${UserGenderEnum.Unknown}(未知)`,
      },
    ]

    const error = validations.find(v => v.condition)
    if (error)
      throw new BadRequestException(error.message)
  }

  /**
   * 创建用户
   * @param createUserDto 创建用户的数据
   * @returns 创建成功的响应
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (isEmpty(createUserDto.email))
        throw new BadRequestException('邮箱不能为空')

      this.validateFields(createUserDto)
      const user = await this.usersService.create(createUserDto)
      return sendResponse(ResultCodeEnum.Created, '用户创建成功', user)
    }
    catch (error) {
      return handleError(error)
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll()
      return sendResponse(ResultCodeEnum.Success, '获取用户列表成功', users)
    }
    catch (error) {
      return handleError(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id)
      return sendResponse(ResultCodeEnum.Success, '获取用户成功', user)
    }
    catch (error) {
      return handleError(error)
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      if (isEmpty(updateUserDto))
        throw new BadRequestException('至少需要提供一个要修改的字段')

      this.validateFields(updateUserDto)
      const user = await this.usersService.update(id, updateUserDto)
      return sendResponse(ResultCodeEnum.Success, '用户更新成功', user)
    }
    catch (error) {
      return handleError(error)
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.remove(id)
      return sendResponse(ResultCodeEnum.Success, '用户删除成功', user)
    }
    catch (error) {
      return handleError(error)
    }
  }

  @Patch(':id/activate')
  async activate(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id)
      
      if (user.status === UserStatusEnum.Activated)
        throw new BadRequestException('用户已经是激活状态')

      const updatedUser = await this.usersService.activate(id)
      return sendResponse(ResultCodeEnum.Success, '用户激活成功', updatedUser)
    }
    catch (error) {
      return handleError(error)
    }
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id)
      
      if (user.status === UserStatusEnum.Inactivated)
        throw new BadRequestException('用户已经是禁用状态')

      const updatedUser = await this.usersService.deactivate(id)
      return sendResponse(ResultCodeEnum.Success, '用户禁用成功', updatedUser)
    }
    catch (error) {
      return handleError(error)
    }
  }
}
