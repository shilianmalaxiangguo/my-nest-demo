import { Injectable, NestMiddleware } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

// 记录应用启动时间
const appStartTime = Date.now()

/**
 * 日志中间件类
 * @Injectable() 表示这个类可以被NestJS注入到其他组件中
 * implements NestMiddleware 表示这是一个中间件类，必须实现use方法
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
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
    const requestId = req.headers['x-request-id'] || 'no-id'
    // 记录请求开始时间
    const startTime = Date.now()

    // 记录请求开始
    logger.info(`[${requestId}] --> ${method} ${originalUrl}`)

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

      // 记录请求结束
      logger.info(
        `[${requestId}] <-- ${method} ${originalUrl} ${statusCode} ${duration}ms`
      )
    })

    // 调用下一个中间件或路由处理函数
    next()
  }
}

// 添加启动日志功能
export function setupStartupLogger(port: number) {
  const origin = `http://localhost:${port}`
  const endTime = Date.now()
  const duration = ((endTime - appStartTime) / 1000).toFixed(2) // 转换为秒，保留2位小数

  logger.info('\n----------------------------------')
  logger.info(`🚀 服务启动成功! ✓`)
  logger.info(`⌚ 启动时间: ${new Date().toLocaleString()}`)
  logger.info(`⏱️  耗时: ${duration}秒`)
  logger.info(`📡 接口地址: ${origin}`)
  logger.info(`📘 Swagger文档: ${origin}/api`)
  logger.info('----------------------------------\n')
  logger.info('正在监听请求...\n')
}
