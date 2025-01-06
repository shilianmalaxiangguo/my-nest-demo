import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'

/**
 * 日志中间件类
 * @Injectable() 表示这个类可以被NestJS注入到其他组件中
 * implements NestMiddleware 表示这是一个中间件类，必须实现use方法
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // Logger是NestJS提供的日志工具，'HTTP'是日志的上下文名称
  private logger = new Logger('HTTP')

  /**
   * 中间件处理函数
   * @param req Express的请求对象，包含请求的所有信息
   * @param res Express的响应对象，用于发送响应
   * @param next 调用下一个中间件的函数
   * 
   * 这个中间件会记录：
   * 1. 请求方法 (GET, POST等)
   * 2. 请求路径 (/users等)
   * 3. 响应状态码 (200, 404等)
   * 4. 请求处理时长 (毫秒)
   */
  use(req: Request, res: Response, next: NextFunction) {
    // 获取请求方法和原始URL
    const { method, originalUrl } = req
    // 记录请求开始时间
    const startTime = Date.now()

    /**
     * 监听响应完成事件
     * res.on('finish') 会在响应发送到客户端后触发
     */
    res.on('finish', () => {
      // 获取响应状态码
      const { statusCode } = res
      // 计算请求处理时长
      const endTime = Date.now()
      const duration = endTime - startTime

      // 使用NestJS的Logger记录请求信息
      // 格式: [HTTP] GET /users 200 123ms
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${duration}ms`,
      )
    })

    // 调用下一个中间件或路由处理函数
    next()
  }
}
