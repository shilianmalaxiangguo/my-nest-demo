import { HttpStatus } from '@nestjs/common'
import type { Response } from '../types/response'

/**
 * 统一响应格式的工具函数
 * @param code 响应状态码
 * @param message 响应消息
 * @param data 响应数据
 * @param status HTTP状态码
 * @returns 格式化的响应对象
 */
export function sendResponse<T>(
  code: number,
  message: string,
  data: T | null = null,
  status: number = HttpStatus.OK,
): Response<T> {
  return {
    code,
    message,
    data,
    status,
  }
} 