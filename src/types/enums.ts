// 响应状态码枚举
export enum ResultCodeEnum {
  Success = 200,           // 成功
  Created = 201,          // 创建成功
  BadRequest = 400,       // 请求参数错误
  NotFound = 404,         // 资源不存在
  Conflict = 409,         // 资源冲突
  ServerError = 500       // 服务器内部错误
}

// HTTP状态码枚举
export enum HttpStatusEnum {
  OK = 200,              // 请求成功
  Created = 201,         // 创建成功
  BadRequest = 400,      // 请求参数错误
  NotFound = 404,        // 资源不存在
  Conflict = 409,        // 资源冲突
  ServerError = 500      // 服务器错误
} 