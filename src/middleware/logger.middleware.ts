import type { NestMiddleware } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`请求方法: ${req.method}`)
    console.log(`请求路径: ${req.path}`)
    console.log(`请求时间: ${new Date().toLocaleString()}`)
    next()
  }
}
