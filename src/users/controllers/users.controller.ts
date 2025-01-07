import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { isEmpty, isNil } from 'lodash'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserStatusEnum, UserGenderEnum } from '../enums/user.enum'
import { ResultCodeEnum, HttpStatusEnum } from '../../types/enums'
import { sendResponse } from '../../utils/response'
import { handleError } from '../../utils/error'

/**
 * 用户控制器类
 * @ApiTags('users') - 在 Swagger 文档中添加标签
 * @Controller('users') - 定义路由前缀为 /users
 */
@ApiTags('users')
@Controller('users')
export class UsersController {
  /**
   * 构造函数 - 注入 UsersService
   * NestJS 会自动创建 UsersService 实例并注入
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * 私有方法：验证用户字段
   * 用于验证用户数据是否符合要求
   */
  private validateFields(data: Partial<CreateUserDto>) {
    // 定义验证规则数组
    const validations = [
      {
        // 验证用户状态是否合法
        condition: !isNil(data.status) && !Object.values(UserStatusEnum).includes(data.status),
        message: `激活状态只能是 ${UserStatusEnum.Activated}(已激活) 或 ${UserStatusEnum.Inactivated}(未激活)`,
      },
      {
        // 验证用户性别是否合法
        condition: !isNil(data.gender) && !Object.values(UserGenderEnum).includes(data.gender),
        message: `性别只能是 ${UserGenderEnum.Male}(男), ${UserGenderEnum.Female}(女) 或 ${UserGenderEnum.Unknown}(未知)`,
      },
    ]

    // 查找第一个验证失败的规则并抛出异常
    const error = validations.find(v => v.condition)
    if (error)
      throw new BadRequestException(error.message)
  }

  /**
   * 创建用户接口
   * 路由: POST /users
   */
  @Post()
  @ApiOperation({ summary: '创建用户' })  // Swagger 接口描述
  @ApiResponse({ status: HttpStatusEnum.Created, description: '用户创建成功' })  // 可能的响应状态
  @ApiResponse({ status: HttpStatusEnum.BadRequest, description: '请求参数错误' })
  async create(@Body() createUserDto: CreateUserDto) {  // @Body() 获取请求体数据
    try {
      // 检查邮箱是否为空
      if (isEmpty(createUserDto.email))
        throw new BadRequestException('邮箱不能为空')

      // 验证其他字段
      this.validateFields(createUserDto)
      // 调用服务创建用户
      const user = await this.usersService.create(createUserDto)
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Created,    // 业务状态码
        '用户创建成功',           // 响应消息
        user,                     // 响应数据
        HttpStatusEnum.Created    // HTTP状态码
      )
    }
    catch (error) {
      return handleError(error)  // 统一错误处理
    }
  }

  /**
   * 获取所有用户接口
   * 路由: GET /users
   */
  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: HttpStatusEnum.OK, description: '获取用户列表成功' })
  async findAll() {
    try {
      // 调用服务获取所有用户
      const users = await this.usersService.findAll()
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Success,
        '获取用户列表成功',
        users,
        HttpStatusEnum.OK
      )
    }
    catch (error) {
      return handleError(error)
    }
  }

  /**
   * 获取单个用户接口
   * 路由: GET /users/:id
   */
  @Get(':id')
  @ApiOperation({ summary: '获取单个用户' })
  @ApiResponse({ status: HttpStatusEnum.OK, description: '获取用户成功' })
  @ApiResponse({ status: HttpStatusEnum.NotFound, description: '用户不存在' })
  async findOne(@Param('id', ParseIntPipe) id: number) {  // ParseIntPipe 自动将 id 转为数字
    try {
      // 调用服务获取用户
      const user = await this.usersService.findOne(id)
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Success,
        '获取用户成功',
        user,
        HttpStatusEnum.OK
      )
    }
    catch (error) {
      return handleError(error)
    }
  }

  /**
   * 更新用户信息接口
   * 路由: PATCH /users/:id
   */
  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: HttpStatusEnum.OK, description: '用户更新成功' })
  @ApiResponse({ status: HttpStatusEnum.NotFound, description: '用户不存在' })
  @ApiResponse({ status: HttpStatusEnum.BadRequest, description: '请求参数错误' })
  async update(
    @Param('id', ParseIntPipe) id: number,    // 获取路径参数 id
    @Body() updateUserDto: UpdateUserDto,      // 获取请求体数据
  ) {
    try {
      // 检查是否提供了更新字段
      if (isEmpty(updateUserDto))
        throw new BadRequestException('至少需要提供一个要修改的字段')

      // 验证字段
      this.validateFields(updateUserDto)
      // 调用服务更新用户
      const user = await this.usersService.update(id, updateUserDto)
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Success,
        '用户更新成功',
        user,
        HttpStatusEnum.OK
      )
    }
    catch (error) {
      return handleError(error)
    }
  }

  /**
   * 删除用户接口
   * 路由: DELETE /users/:id
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: HttpStatusEnum.OK, description: '用户删除成功' })
  @ApiResponse({ status: HttpStatusEnum.NotFound, description: '用户不存在' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      // 调用服务删除用户
      const user = await this.usersService.remove(id)
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Success,
        '用户删除成功',
        user,
        HttpStatusEnum.OK
      )
    }
    catch (error) {
      return handleError(error)
    }
  }

  /**
   * 激活用户接口
   * 路由: PATCH /users/:id/activate
   */
  @Patch(':id/activate')
  @ApiOperation({ summary: '激活用户' })
  @ApiResponse({ status: HttpStatusEnum.OK, description: '用户激活成功' })
  @ApiResponse({ status: HttpStatusEnum.NotFound, description: '用户不存在' })
  @ApiResponse({ status: HttpStatusEnum.BadRequest, description: '用户已经是激活状态' })
  async activate(@Param('id', ParseIntPipe) id: number) {
    try {
      // 先查找用户
      const user = await this.usersService.findOne(id)
      
      // 检查用户当前状态
      if (user.status === UserStatusEnum.Activated)
        throw new BadRequestException('用户已经是激活状态')

      // 调用服务激活用户
      const updatedUser = await this.usersService.activate(id)
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Success,
        '用户激活成功',
        updatedUser,
        HttpStatusEnum.OK
      )
    }
    catch (error) {
      return handleError(error)
    }
  }

  /**
   * 停用用户接口
   * 路由: PATCH /users/:id/deactivate
   */
  @Patch(':id/deactivate')
  @ApiOperation({ summary: '停用用户' })
  @ApiResponse({ status: HttpStatusEnum.OK, description: '用户停用成功' })
  @ApiResponse({ status: HttpStatusEnum.NotFound, description: '用户不存在' })
  @ApiResponse({ status: HttpStatusEnum.BadRequest, description: '用户已经是禁用状态' })
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    try {
      // 先查找用户
      const user = await this.usersService.findOne(id)
      
      // 检查用户当前状态
      if (user.status === UserStatusEnum.Inactivated)
        throw new BadRequestException('用户已经是禁用状态')

      // 调用服务停用用户
      const updatedUser = await this.usersService.deactivate(id)
      // 返回成功响应
      return sendResponse(
        ResultCodeEnum.Success,
        '用户禁用成功',
        updatedUser,
        HttpStatusEnum.OK
      )
    }
    catch (error) {
      return handleError(error)
    }
  }
}
