import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './middleware/swagger.middleware'
import { setupValidation } from './middleware/validation.middleware'
import { setupStartupLogger } from './middleware/logger.middleware'

async function main() {
  const app = await NestFactory.create(AppModule)
  const port = 5000
  const origin = `http://localhost:${port}`

  // 设置中间件
  setupSwagger(app)
  setupValidation(app)
  
  app.enableCors({
    origin: [origin],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })

  await app.listen(port)
  
  setupStartupLogger(port)
}

main()
