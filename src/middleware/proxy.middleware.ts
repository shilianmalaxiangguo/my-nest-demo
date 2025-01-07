import { Injectable, NestMiddleware } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'
import { logger } from 'src/utils/logger'
import { v4 as uuidv4 } from 'uuid'

/**
 * 代理中间件
 * 用于:
 * 1. 请求转发
 * 2. 请求头修改
 * 3. 跨域处理
 * 4. 请求过滤
 */
@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 生成请求ID (格式: xxxx-xxxx-xxxx)
    const fullUuid = uuidv4()
    const requestId = fullUuid.split('-').slice(0, 3).join('-')
    
    // 添加到请求头
    req.headers['x-request-id'] = requestId
    req.headers['x-proxy-time'] = new Date().toISOString()
    
    // 请求来源验证
    const origin = req.headers.origin
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    }

    // 请求过滤或转发逻辑
    if (req.path.startsWith('/api/v1')) {
      // 可以在这里添加 API 版本控制逻辑
    }

    // 记录代理信息
    logger.info(`[Proxy] ${req.method} ${req.path} from ${req.ip}`)
    next()
  }
}
