import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { UserStatusEnum, UserGenderEnum } from '../enums/user.enum'

// 创建用户的数据传输对象
export class CreateUserDto {
  @IsEmail()                    // 验证是否为有效的邮箱格式
  email: string                 // 用户邮箱

  @IsString()                   // 验证是否为字符串
  @IsOptional()                 // 该字段是可选的
  name?: string                 // 用户名称

  @IsEnum(UserStatusEnum)       // 验证是否为 UserStatusEnum 中的值
  @IsOptional()                 // 该字段是可选的
  status?: UserStatusEnum       // 用户状态

  @IsEnum(UserGenderEnum)       // 验证是否为 UserGenderEnum 中的值
  @IsOptional()                 // 该字段是可选的
  gender?: UserGenderEnum       // 用户性别
} 