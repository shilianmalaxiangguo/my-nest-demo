import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export enum UserStatus {
  Inactivated = 0,
  Activated = 1,
}

export enum UserGender {
  Unknown = 0,
  Male = 1,
  Female = 2,
}

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @IsOptional()
  name?: string

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus

  @IsEnum(UserGender)
  @IsOptional()
  gender?: UserGender
} 