import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication) {
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
    customCss: '.swagger-ui .topbar { display: none }',
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
} 