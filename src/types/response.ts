// 通用响应接口
export interface Response<T> {
  code: number      // 响应状态码
  message: string   // 响应消息
  data: T | null    // 响应数据，可以是泛型T或null
  status: number    // HTTP状态码
} 