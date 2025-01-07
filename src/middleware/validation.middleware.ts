import { INestApplication, ValidationPipe } from '@nestjs/common'

/**
 * 设置全局验证管道
 * 用于验证请求数据是否符合 DTO 中定义的规则
 */
export function setupValidation(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,     // 过滤掉未在 DTO 中声明的属性
    transform: true,     // 自动转换数据类型
    forbidNonWhitelisted: true,  // 当出现未声明的属性时抛出错误
    transformOptions: {
      enableImplicitConversion: true  // 启用隐式类型转换
    }
  }))
} 