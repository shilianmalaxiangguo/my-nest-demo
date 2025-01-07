import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserStatusEnum, UserGenderEnum } from '../enums/user.enum'

// 创建用户的数据传输对象
export class CreateUserDto {
  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com',
  })
  @IsEmail()                    // 验证是否为有效的邮箱格式
  email: string                 // 用户邮箱

  @ApiProperty({
    description: '用户名称',
    example: 'John Doe',
  })
  @IsString()                   // 验证是否为字符串
  @IsOptional()                 // 该字段是可选的
  name?: string                 // 用户名称

  @ApiProperty({
    description: '用户状态',
    enum: UserStatusEnum,
    default: UserStatusEnum.Inactivated,
    example: UserStatusEnum.Activated,
  })
  @IsEnum(UserStatusEnum)       // 验证是否为 UserStatusEnum 中的值
  @IsOptional()                 // 该字段是可选的
  status?: UserStatusEnum       // 用户状态

  @ApiProperty({
    description: '用户性别',
    enum: UserGenderEnum,
    default: UserGenderEnum.Unknown,
    example: UserGenderEnum.Male,
  })
  @IsEnum(UserGenderEnum)       // 验证是否为 UserGenderEnum 中的值
  @IsOptional()                 // 该字段是可选的
  gender?: UserGenderEnum       // 用户性别
} 