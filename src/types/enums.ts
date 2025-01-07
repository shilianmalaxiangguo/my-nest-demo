// 响应状态码枚举
export enum ResultCodeEnum {
  Success = 200,           // 操作成功
  Created = 201,          // 创建成功
  NoContent = 204,        // 无内容
  BadRequest = 400,       // 请求参数错误
  Unauthorized = 401,     // 未授权
  Forbidden = 403,        // 禁止访问
  NotFound = 404,         // 资源不存在
  MethodNotAllowed = 405, // 方法不允许
  Conflict = 409,         // 资源冲突
  ServerError = 500       // 服务器内部错误
}

// HTTP状态码枚举
export enum HttpStatusEnum {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  ServerError = 500
} 