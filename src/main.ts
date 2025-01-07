import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
const chalk = require('chalk')
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('NestApplication')
  const app = await NestFactory.create(AppModule)

  // Swagger配置
  const config = new DocumentBuilder()
    .setTitle('用户管理系统 API')
    .setDescription('基于 NestJS + Prisma + PostgreSQL 的用户管理系统 API 文档')
    .setVersion('1.0')
    .addTag('users', '用户管理相关接口')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  
  const options = {
    explorer: true,
    customSiteTitle: '用户管理系统 API 文档',
    customCss: '.swagger-ui .topbar { display: none }', // 隐藏顶部栏
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
      theme: 'outline',
      defaultModelsExpandDepth: -1,
      displayRequestDuration: true,
      filter: true,
      syntaxHighlight: {
        theme: 'monokai'
      },
      tryItOutEnabled: true
    }
  }

  SwaggerModule.setup('api', app, document, options)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))

  const port = 5000
  const origin = `http://localhost:${port}`

  app.enableCors({
    origin: [origin],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })

  await app.listen(port)

  // 优雅地打印启动信息
  logger.log('\n🚀 服务已启动! ✓\n')
  logger.log(`📡 接口地址: ${origin}`)
  logger.log(`📘 Swagger文档: ${origin}/api\n`)
  logger.log('正在监听请求...\n')
}
bootstrap()
