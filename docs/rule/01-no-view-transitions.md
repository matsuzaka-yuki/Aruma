# 禁止使用 ViewTransitions

## 原因

项目中**严禁使用 Astro 的 ViewTransitions**，原因如下：

1. **主题闪白问题**：ViewTransitions 会造成现有主题在页面切换时闪白色
2. **全局作用域**：Astro 的 ViewTransitions 是全局性的，会影响所有页面
3. **用户体验差**：主题闪白会严重影响用户的视觉体验，特别是在暗色模式下

## 问题表现

当使用 ViewTransitions 时：
- 从暗色模式页面跳转到另一个页面时，会短暂显示白色背景
- 页面切换过程中出现明显的颜色闪烁
- 破坏了 MDUI 主题系统的连贯性

## 错误示例

```astro
---
// ❌ 错误：不要在 Layout 中使用 ViewTransitions
import { ClientRouter } from 'astro:transitions';
---

<!doctype html>
<html>
  <head>
    <ClientRouter />  <!-- 禁止使用 -->
  </head>
</html>
```

## 正确做法

使用传统的页面跳转方式：

```astro
---
// ✅ 正确：不使用 ViewTransitions
---

<!doctype html>
<html>
  <head>
    <!-- 不添加 ClientRouter -->
  </head>
</html>
```

## 替代方案

如果需要页面过渡效果，可以：

1. **使用 CSS 动画**：通过 CSS 的 `@keyframes` 实现局部过渡效果
2. **使用 Pace.js**：项目已集成 Pace.js 用于页面加载进度指示
3. **使用 MDUI 的过渡效果**：利用 MDUI 组件自带的动画效果

## 已有代码处理

项目中已经存在 ViewTransitions 相关代码（用于 Pace.js 集成），但这些**仅用于事件监听**，不涉及实际的页面过渡：

```javascript
// ✅ 允许：仅用于事件监听
document.addEventListener('astro:before-preparation', () => {
  if (window.Pace) window.Pace.restart();
});

document.addEventListener('astro:page-load', () => {
  if (window.Pace) window.Pace.stop();
});
```

**注意**：这些事件监听器不会触发 ViewTransitions 的页面过渡效果。

## 检查清单

在代码审查时，确保：

- [ ] Layout.astro 中没有 `<ClientRouter />`
- [ ] 没有导入 `astro:transitions` 的路由组件
- [ ] 页面切换时没有闪白现象
- [ ] 暗色模式切换流畅无闪烁

## 相关文件

- `src/layouts/Layout.astro` - 主布局文件
- `src/components/Header.astro` - 导航组件
