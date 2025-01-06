import { Injectable, NestMiddleware } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'

/**
 * 代理中间件类
 * 用于处理跨域请求、请求转发等功能
 * @Injectable() 使这个类可以被依赖注入系统管理
 */
@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  /**
   * 中间件处理函数
   * @param req Express请求对象
   * @param res Express响应对象
   * @param next 下一个中间件函数
   * 
   * 这个中间件可以：
   * 1. 修改请求头
   * 2. 验证来源
   * 3. 转发请求
   * 4. 处理跨域
   */
  use(req: Request, res: Response, next: NextFunction) {
    // 示例：添加自定义请求头
    req.headers['x-proxy-time'] = new Date().toISOString()

    // 示例：验证请求来源
    const origin = req.headers.origin
    if (origin) {
      // 设置CORS头
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    }

    // 示例：记录代理信息
    console.log(`[Proxy] ${req.method} ${req.path} from ${req.ip}`)

    // 继续处理请求
    next()
  }
}
