# NestJS 用户管理系统

基于 NestJS + Prisma + PostgreSQL 的用户管理系统,实现了完整的用户管理功能。

## 项目介绍

本项目是一个基于 NestJS 框架开发的用户管理系统,采用 TypeScript 开发,使用 Prisma ORM 操作 PostgreSQL 数据库。项目实现了用户的增删改查、状态管理等功能,并包含了完整的数据验证、错误处理和日志记录。

## 技术栈

- 🚀 NestJS v10.4 - 企业级 Node.js 框架
- 📦 PostgreSQL + Prisma ORM - 数据库及 ORM
- 🔒 TypeScript v5 - 类型安全
- ✨ ESLint (Antfu Config) - 代码规范
- 📝 Class Validator - 数据验证
- 🌐 CORS - 跨域支持
- 🔍 请求日志中间件 - 日志记录
- 🛠️ Lodash - 工具函数库

## 项目结构

```bash
src/
├── middleware/          # 中间件
│   ├── logger.middleware.ts  # 日志中间件
│   └── proxy.middleware.ts   # 代理中间件
├── prisma/             # Prisma 相关
│   ├── schema.prisma   # 数据库模型
│   └── prisma.service.ts
├── types/              # 类型定义
│   ├── enums.ts        # 枚举定义
│   └── response.ts     # 响应类型
├── users/              # 用户模块
│   ├── controllers/    # 控制器
│   ├── services/       # 服务
│   ├── dto/           # 数据传输对象
│   └── enums/         # 用户相关枚举
├── utils/              # 工具函数
│   ├── error.ts       # 错误处理
│   └── response.ts    # 响应处理
└── main.ts            # 应用入口
```

## 功能特性

### 用户管理 API

- `POST /users` - 创建用户
- `GET /users` - 获取用户列表
- `GET /users/:id` - 获取单个用户
- `PATCH /users/:id` - 更新用户信息
- `DELETE /users/:id` - 删除用户
- `PATCH /users/:id/activate` - 激活用户
- `PATCH /users/:id/deactivate` - 停用用户

### 数据验证

- 邮箱格式验证 (@IsEmail())
- 性别枚举验证 (Male/Female/Unknown)
- 状态枚举验证 (Activated/Inactivated)
- 字段类型验证 (@IsString(), @IsOptional())

### 统一响应格式

```typescript
interface Response<T> {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: T | null; // 响应数据
  status: number; // HTTP状态码
}
```

### 错误处理

- HTTP 异常统一处理
- 业务异常统一处理
- 参数验证异常处理
- 数据库异常处理

### 日志系统

- 请求方法记录
- 请求路径记录
- 响应状态记录
- 请求耗时记录

## 快速开始

1. 克隆项目

```bash
git clone <repository-url>
cd my-nest-demo
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件,配置数据库连接等信息
```

4. 初始化数据库

```bash
pnpm prisma:generate
pnpm prisma:push
```

5. 启动开发服务器

```bash
pnpm start:dev
```

6. 访问接口

```bash
curl http://localhost:3000/users
```

## 开发命令

- `pnpm start` - 启动生产服务器
- `pnpm start:dev` - 启动开发服务器(热重载)
- `pnpm build` - 构建项目
- `pnpm clean` - 清理构建文件
- `pnpm lint` - 代码检查
- `pnpm lint:fix` - 自动修复代码问题

## 环境要求

- Node.js >= 18
- PostgreSQL >= 12
- pnpm >= 8

## 许可证

[MIT](LICENSE)
