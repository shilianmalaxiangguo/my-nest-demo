import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import * as path from 'path'

// 创建 logs 目录
const logDir = 'logs'

// 创建 Winston 日志记录器
export const logger = createLogger({
  // 日志格式
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`
    })
  ),
  // 日志传输方式
  transports: [
    // 控制台输出
    new transports.Console(),
    // 按天rotating文件
    new transports.DailyRotateFile({
      dirname: logDir,  // 日志保存目录
      filename: 'application-%DATE%.log',  // 日志名称格式
      datePattern: 'YYYY-MM-DD',  // 按天分割
      maxSize: '5m',  // 每个文件最大5MB
      maxFiles: '30d',  // 保留30天的日志
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
}) 