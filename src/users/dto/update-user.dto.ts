import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

/**
 * 更新用户的数据传输对象
 * 继承自CreateUserDto，但所有字段都是可选的
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {} 