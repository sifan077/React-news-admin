# React News Admin

React 18 单页面新闻管理系统，使用 Ant Design 构建。

## 功能特点

- 基于 React 18 + React Router v6
- Ant Design UI 组件库 (中文)
- json-server 提供 RESTful API 模拟后端
- 角色权限管理（超级管理员/区域管理员/区域编辑）
- 新闻发布流程管理（草稿/审核/发布）
- ECharts 数据可视化
- Draft.js 富文本编辑器

## 项目结构

```
├── src/
│   ├── components/      # 可复用组件
│   ├── constants/       # 常量定义
│   ├── router/          # 路由配置
│   ├── services/        # API 服务层
│   ├── util/            # 工具函数
│   └── views/           # 页面组件
├── dbServer/            # json-server 后端
└── CODE_STANDARDS.md    # 代码规范文档
```

## 安装依赖

### 1. 安装前端依赖

在项目根目录运行：

```bash
npm install
```

### 2. 安装后端依赖

进入 `dbServer` 文件夹：

```bash
cd dbServer
npm install
```

## 启动项目

### 1. 启动后端服务

在 `dbServer` 文件夹中运行：

```bash
npm start
```

后端服务将在 http://localhost:8000 启动

### 2. 启动前端项目

在项目根目录运行：

```bash
npm start
```

前端项目将在 http://localhost:3000 启动，浏览器会自动打开。

## 默认登录账号

- 用户名: `admin`
- 密码: `123456`

## 技术栈

- React 18
- React Router v6
- Ant Design 4.x
- Axios
- ECharts 5
- Draft.js
- Moment.js
- json-server

## 代码规范

请查看 [CODE_STANDARDS.md](./CODE_STANDARDS.md) 了解项目代码规范和最佳实践。

## 注意事项

- `node_modules` 文件夹不包含在版本控制中
- 启动前需要先安装依赖
- 确保 8000 和 3000 端口未被占用
