# 国际化（i18n）使用规范

## 核心原则

项目中**所有面向用户的字符串必须使用 i18n 系统**，以确保多语言支持。

## 必须使用 i18n 的场景

### 1. 页面标题和描述

```astro
---
// ✅ 正确：使用 i18n
import { i18n } from '../i18n/translation';
import I18nKey from '../i18n/i18nKey';

<Layout title={i18n(I18nKey.albums)}>
  <!-- 内容 -->
</Layout>
---

// ❌ 错误：硬编码字符串
<Layout title="相册">
  <!-- 内容 -->
</Layout>
```

### 2. 按钮和链接文本

```astro
---
// ✅ 正确
<button>{i18n(I18nKey.submit)}</button>
<a href="/">{i18n(I18nKey.home)}</a>

// ❌ 错误
<button>提交</button>
<a href="/">首页</a>
```

### 3. 表单标签和提示

```astro
---
// ✅ 正确
<label>{i18n(I18nKey.username)}</label>
<input placeholder={i18n(I18nKey.usernamePlaceholder)} />

// ❌ 错误
<label>用户名</label>
<input placeholder="请输入用户名" />
```

### 4. 错误和成功消息

```astro
---
// ✅ 正确
<p class="error">{i18n(I18nKey.errorMessage)}</p>
<p class="success">{i18n(I18nKey.successMessage)}</p>

// ❌ 错误
<p class="error">操作失败</p>
<p class="success">操作成功</p>
```

### 5. 导航和菜单项

```astro
---
// ✅ 正确
<a href="/">{i18n(I18nKey.home)}</a>
<a href="/albums">{i18n(I18nKey.albums)}</a>

// ❌ 错误
<a href="/">首页</a>
<a href="/albums">相册</a>
```

### 6. 时间和日期格式

```astro
---
// ✅ 正确：使用带参数的 i18n
{i18n(I18nKey.diaryMinutesAgo).replace('{count}', '5')}

// ❌ 错误
5分钟前
```

## i18n 系统使用方法

### 1. 导入依赖

```typescript
import { i18n } from '../i18n/translation';
import I18nKey from '../i18n/i18nKey';
```

### 2. 使用 i18n 函数

```astro
---
// 简单字符串
<h1>{i18n(I18nKey.albums)}</h1>

// 带参数的字符串
<p>{i18n(I18nKey.foundPosts, { count: 10 })}</p>

// 字符串替换
<span>{i18n(I18nKey.views).replace('{count}', '100')}</span>
```

### 3. 定义新的 i18n 键

#### 步骤 1：在 I18nKey 中添加键

```typescript
// src/i18n/i18nKey.ts
const I18nKey = {
  // 现有键...
  
  // 添加新键
  myNewKey: 'myNewKey',
  myParamKey: 'myParamKey',
} as const;

export default I18nKey;
```

#### 步骤 2：在语言文件中添加翻译

```typescript
// src/i18n/languages/zh-CN.ts
export default {
  // 现有翻译...
  
  myNewKey: '我的新键',
  myParamKey: '找到 {count} 个结果',
};
```

```typescript
// src/i18n/languages/en.ts
export default {
  // 现有翻译...
  
  myNewKey: 'My New Key',
  myParamKey: 'Found {count} results',
};
```

## 不需要使用 i18n 的场景

### 1. 开发者信息

```astro
---
// ✅ 可以硬编码
<!-- TODO: 待优化 -->
<!-- DEBUG: 仅用于开发 -->
```

### 2. 代码注释

```typescript
// ✅ 可以硬编码
// 这是一个辅助函数
function helper() {
  // ...
}
```

### 3. API 端点和路径

```astro
---
// ✅ 可以硬编码
<a href="/api/posts">API</a>
<form action="/api/submit">...</form>
```

### 4. 第三方库的配置

```typescript
// ✅ 可以硬编码
const options = {
  dateFormat: 'YYYY-MM-DD', // 格式字符串
  locale: 'zh-CN', // 语言代码
};
```

### 5. Meta 标签和 SEO（特殊情况）

```astro
---
// ✅ 对于 SEO，可以根据当前语言动态生成
const title = i18n(I18nKey.pageTitle);
const description = i18n(I18nKey.pageDescription);

<meta name="description" content={description} />
<title>{title}</title>
```

## 常见错误和修正

### 错误 1：忘记使用 i18n

```astro
---
// ❌ 错误
<button class="mdui-btn">点击这里</button>

// ✅ 正确
<button class="mdui-btn">{i18n(I18nKey.clickHere)}</button>
```

### 错误 2：在 i18n 字符串中硬编码

```typescript
// ❌ 错误
export default {
  welcomeMessage: '欢迎，张三',
};

// ✅ 正确
export default {
  welcomeMessage: '欢迎，{name}',
};

// 使用
{i18n(I18nKey.welcomeMessage, { name: '张三' })}
```

### 错误 3：在 JavaScript 中直接硬编码

```javascript
// ❌ 错误
alert('操作成功');

// ✅ 正确
import { i18n } from '../i18n/translation';
import I18nKey from '../i18n/i18nKey';

alert(i18n(I18nKey.successMessage));
```

## i18n 最佳实践

### 1. 语义化的键名

```typescript
// ✅ 好的键名
I18nKey.albumsEmpty
I18nKey.albumsPhotoCount
I18nKey.searchPlaceholder

// ❌ 不好的键名
I18nKey.text1
I18nKey.message
I18nKey.temp
```

### 2. 完整的句子而不是片段

```typescript
// ✅ 正确
export default {
  confirmDelete: '确定要删除这个项目吗？',
  deleteSuccess: '项目已成功删除',
};

// ❌ 错误
export default {
  confirm: '确定',
  delete: '删除',
  success: '成功',
};
```

### 3. 考虑复数形式

```typescript
// ✅ 正确：提供单数和复数形式
export default {
  albumsPhotoCount: '张照片',
  albumsPhotosCount: '张照片',
  // 或者使用参数
  photoCount: '{count} 张照片',
};
```

### 4. 保持一致性

```typescript
// ✅ 正确：一致的命名风格
export default {
  albumsTitle: '相册',
  albumsEmpty: '暂无相册',
  albumsPhotoCount: '张照片',
};
```

## 代码审查检查清单

- [ ] 所有用户可见的文本都使用了 i18n
- [ ] 没有硬编码的中文字符串（除了注释和开发者信息）
- [ ] i18n 键名语义清晰
- [ ] 带参数的字符串使用了参数化
- [ ] 新增的 i18n 键在所有语言文件中都有翻译
- [ ] i18n 函数调用正确

## 相关文件

- `src/i18n/i18nKey.ts` - i18n 键定义
- `src/i18n/translation.ts` - i18n 核心函数
- `src/i18n/languages/zh-CN.ts` - 简体中文翻译
- `src/i18n/languages/en.ts` - 英文翻译
- `src/i18n/languages/ja.ts` - 日文翻译
- `src/i18n/languages/zh-TW.ts` - 繁体中文翻译

## 支持的语言

项目目前支持以下语言：

- `zh-CN` - 简体中文（默认）
- `zh-TW` - 繁体中文
- `en` - English
- `ja` - 日本語

## 参考资料

- [项目 i18n 架构](../i18n/)
- [Astro i18n 指南](https://docs.astro.build/en/recipes/i18n/)
