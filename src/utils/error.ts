import { HttpException, HttpStatus } from '@nestjs/common'
import { ResultCodeEnum } from '../types/enums'
import { sendResponse } from './response'

/**
 * 统一错误处理函数
 * @param error 捕获到的错误
 * @returns 格式化的错误响应
 */
export function handleError(error: any) {
  // 如果是 HTTP 异常
  if (error instanceof HttpException) {
    return sendResponse(
      ResultCodeEnum.BadRequest,
      error.message,
      null,
      error.getStatus(),
    )
  }
  
  // 其他未知错误
  return sendResponse(
    ResultCodeEnum.ServerError,
    '服务器内部错误',
    null,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
} 