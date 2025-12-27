# 代码规范文档 (Code Standards)

## 项目结构重构说明

### 主要改进

1. **修复文件夹拼写错误**
   - `src/compoments` → `src/components` (正确拼写)

2. **创建常量文件** (`src/constants/index.js`)
   - 定义用户角色常量 (USER_ROLES)
   - 定义审核状态常量 (AUDIT_STATE)
   - 定义发布状态常量 (PUBLISH_STATE)
   - 定义路由常量 (ROUTES)
   - 定义区域常量 (REGION)

3. **创建API服务层** (`src/services/api.js`)
   - authService: 认证服务
   - newsService: 新闻服务
   - categoryService: 分类服务
   - userService: 用户服务
   - regionService: 区域服务
   - roleService: 角色服务
   - rightService: 权限服务

4. **优化HTTP工具** (`src/util/http.js`)
   - 添加请求超时设置 (10秒)
   - 改善错误处理
   - 统一代码格式

5. **代码质量改进**
   - 移除未使用的 props 参数
   - 移除调试用的 console.log 语句
   - 修复 useEffect 依赖项警告
   - 统一代码格式和缩进
   - 改进错误处理

## 编码规范

### 组件定义
```javascript
// 推荐: 如果不使用props，不要声明它
function MyComponent() {
  return <div>...</div>;
}

// 不推荐
function MyComponent(props) {  // props未使用
  return <div>...</div>;
}
```

### useEffect 依赖项
```javascript
// 推荐: 精确指定依赖项
useEffect(() => {
  fetchData(params.id);
}, [params.id]);

// 不推荐: 依赖整个对象
useEffect(() => {
  fetchData(params.id);
}, [params]);
```

### 错误处理
```javascript
// 推荐: 添加错误处理
axios.get('/api/data')
  .then(res => handleSuccess(res))
  .catch(err => handleError(err));

// 不推荐: 没有错误处理
axios.get('/api/data')
  .then(res => handleSuccess(res));
```

### 使用常量
```javascript
// 推荐: 使用常量
import { USER_ROLES } from '../constants';
if (roleId === USER_ROLES.SUPER_ADMIN) { ... }

// 不推荐: 硬编码魔法数字
if (roleId === 1) { ... }
```

### API调用
```javascript
// 推荐: 使用服务层
import { newsService } from '../services/api';
newsService.getById(id, { _expand: 'category' });

// 可接受: 直接使用axios (简单场景)
import axios from 'axios';
axios.get(`/news/${id}?_expand=category`);
```

## 文件组织

```
src/
├── components/        # 可复用组件
├── constants/         # 常量定义
├── router/           # 路由配置
├── services/         # API服务层
├── util/             # 工具函数
└── views/            # 页面组件
```

## Ant Design 更新

注意: 某些Ant Design组件的API可能需要更新：
- Modal/Drawer: 考虑使用 `open` 替代 `visible` (在Ant Design 5.x中)
- 当前项目使用 Ant Design 4.x，保持使用 `visible`

## 待改进项

1. 考虑引入 TypeScript 提供类型安全
2. 添加 PropTypes 进行运行时类型检查
3. 实现错误边界组件
4. 添加单元测试
5. 抽取内联样式到CSS文件
6. 优化组件性能 (React.memo, useMemo, useCallback)
