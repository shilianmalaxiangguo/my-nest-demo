# NestJS 用户管理系统

基于 NestJS + Prisma + PostgreSQL 的用户管理系统。

## 项目介绍

本项目是一个基于 NestJS 框架开发的用户管理系统，采用 TypeScript 开发，使用 Prisma ORM 操作 PostgreSQL 数据库，实现了完整的用户 CRUD 功能。

## 技术栈

- 🚀 NestJS v10.4
- 📦 PostgreSQL + Prisma ORM
- 🔒 TypeScript v5
- ✨ ESLint (Antfu Config)
- 📝 Class Validator
- 🌐 CORS 支持
- 🔍 请求日志中间件

## 项目结构

bash
src/
├── middleware/ # 中间件
│ └── logger.middleware.ts
├── prisma/ # Prisma 相关
│ ├── schema.prisma # 数据库模型
│ └── prisma.service.ts
├── users/ # 用户模块
│ ├── controllers/ # 控制器层
│ │ └── users.controller.ts
│ ├── services/ # 服务层
│ │ └── users.service.ts
│ ├── dto/ # 数据传输对象
│ │ ├── create-user.dto.ts
│ │ └── update-user.dto.ts
│ └── users.module.ts
├── app.controller.ts # 应用控制器
├── app.module.ts # 应用模块
└── main.ts # 入口文件

## 功能特性

### 用户管理

- 创建用户（POST /users）
- 查询用户列表（GET /users）
- 查询单个用户（GET /users/:id）
- 更新用户信息（PATCH /users/:id）
- 删除用户（DELETE /users/:id）
- 激活用户（PATCH /users/:id/activate）
- 停用用户（PATCH /users/:id/deactivate）

### 数据验证

- 邮箱格式验证
- 性别枚举验证
- 状态枚举验证

### 日志系统

- 请求方法记录
- 请求路径记录
- 请求时间记录

## 快速开始

1. 安装依赖
2. 启动开发环境
3. 访问 http://localhost:3000/users 查看用户列表
