# 个人信息卡片配置指南

本文档介绍如何在 Aruma 项目中配置侧边栏个人信息卡片（ProfileCard）。

## 功能概述

个人信息卡片显示在博客侧边栏顶部，包含以下内容：
- 背景图片
- 头像
- 用户名
- 个人描述
- 社交链接图标

## 配置方法

编辑 `src/site.config.ts` 文件，找到相关配置项：

### 基础信息

```typescript
export const siteConfig: SiteConfig = {
  title: "有希",                    // 网站标题
  author: "有希",                   // 用户名（显示在卡片中）
  description: "有希的个人博客",     // 个人描述
  avatar: avatarImage.src,          // 头像图片路径
  sidebarBg: sidebarImage.src,      // 侧边栏背景图片路径
  // ...
};
```

### 个人信息卡片配置

```typescript
profileCard: {
  social: [
    { name: "GitHub", url: "https://github.com/yourname", icon: "github" },
    { name: "Twitter", url: "https://twitter.com/yourname", icon: "twitter" },
    { name: "Email", url: "mailto:your@email.com", icon: "email" },
  ],
  showSocialLinks: true,  // 是否显示社交链接
},
```

## 配置项说明

### social（社交链接）

社交链接数组，每个链接包含以下属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | string | 链接名称（鼠标悬停时显示） |
| `url` | string | 链接地址 |
| `icon` | string | 图标标识（见下方支持的图标列表） |

### showSocialLinks

- 类型：`boolean`
- 默认值：`true`
- 说明：控制是否显示社交链接区域

## 支持的图标

以下是 `icon` 字段支持的图标标识及对应的 Material Icons 名称：

| 标识 | Material Icons |
|------|----------------|
| `github` | `code` |
| `twitter` | `share` |
| `email` | `email` |
| `bilibili` | `play_circle` |
| `qq` | `chat` |
| `wechat` | `chat_bubble` |
| `weibo` | `public` |
| `zhihu` | `question_answer` |
| `youtube` | `play_circle_filled` |
| `instagram` | `camera_alt` |
| `linkedin` | `work` |
| `telegram` | `send` |
| `discord` | `forum` |
| `rss` | `rss_feed` |
| `douban` | `library_books` |
| `reddit` | `forum` |
| `medium` | `article` |
| `stackoverflow` | `code` |
| `website` | `language` |
| 其他 | `link`（默认） |

## 完整配置示例

```typescript
// src/site.config.ts

import avatarImage from "./assets/home/logo.webp";
import sidebarImage from "./assets/home/sidebar.webp";

export const siteConfig: SiteConfig = {
  // 基础信息
  title: "我的博客",
  author: "博主名",
  description: "这是我的个人博客",
  avatar: avatarImage.src,
  sidebarBg: sidebarImage.src,

  // 其他配置...

  // 个人信息卡片配置
  profileCard: {
    social: [
      { name: "GitHub", url: "https://github.com/username", icon: "github" },
      { name: "Bilibili", url: "https://space.bilibili.com/123456", icon: "bilibili" },
      { name: "邮箱", url: "mailto:hello@example.com", icon: "email" },
    ],
    showSocialLinks: true,
  },
};
```

## 自定义头像和背景

### 替换头像

将新头像文件放入 `src/assets/home/` 目录，然后在配置中引用：

```typescript
import newAvatar from "./assets/home/my-avatar.webp";

avatar: newAvatar.src,
```

### 替换背景

将新背景图片放入 `src/assets/home/` 目录，然后在配置中引用：

```typescript
import newBg from "./assets/home/my-sidebar-bg.webp";

sidebarBg: newBg.src,
```

## 常见问题

### Q: 如何隐藏社交链接？

设置 `showSocialLinks: false`：

```typescript
profileCard: {
  social: [...],
  showSocialLinks: false,
},
```

### Q: 如何添加不支持的社交平台？

使用任意 `icon` 值，系统会自动使用默认的链接图标：

```typescript
{ name: "我的网站", url: "https://example.com", icon: "website" },
```

### Q: 社交链接图标在哪里显示？

社交链接显示在个人信息卡片的描述文字下方，以圆形图标按钮的形式排列。鼠标悬停时会显示链接名称，并变为粉色主题色。
