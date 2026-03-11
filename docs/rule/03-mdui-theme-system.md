# MDUI 主题系统与 Tailwind CSS 使用规范

## 核心原则

项目中**MDUI 的主题系统禁止使用 Tailwind CSS**，其他部分可以使用 Tailwind CSS。

## MDUI 主题系统范围

以下内容属于 MDUI 主题系统，**严禁使用 Tailwind CSS**：

### 1. 主题变量
- `--mdui-color-primary` - 主色
- `--mdui-color-secondary` - 次要色
- `--mdui-color-background` - 背景色
- `--mdui-color-surface` - 表面色
- `--mdui-color-on-surface` - 表面文字色
- `--mdui-theme-layout-dark` - 暗色模式类名

### 2. MDUI 组件
- `<mdui-card>` - 卡片组件
- `<mdui-button>` - 按钮组件
- `<mdui-dialog>` - 对话框组件
- `<mdui-drawer>` - 抽屉组件
- `<mdui-list>` - 列表组件
- 其他所有 MDUI 组件

### 3. MDUI 工具类
- `.mdui-theme-primary-pink` - 主题色
- `.mdui-theme-accent-pink` - 强调色
- `.mdui-theme-layout-dark` - 暗色模式
- `.mdui-text-color-theme` - 主题文字色
- 其他所有 MDUI 工具类

## 正确的使用方式

### ✅ MDUI 主题系统 - 使用 MDUI 方式

```astro
---
// ✅ 正确：MDUI 组件使用 MDUI 类名
---

<!-- 主题相关 -->
<body class="mdui-theme-primary-pink mdui-theme-accent-pink">

<!-- MDUI 组件 -->
<mdui-card class="mdui-hoverable">
  <div class="mdui-card-primary">
    <div class="mdui-card-primary-title">标题</div>
  </div>
</mdui-card>

<!-- 暗色模式 -->
<style>
  :global(.mdui-theme-layout-dark) .my-component {
    background-color: var(--mdui-color-surface);
  }
</style>
```

### ✅ 其他部分 - 使用 Tailwind CSS

```astro
---
// ✅ 正确：非主题部分使用 Tailwind
---

<!-- 布局 -->
<div class="grid grid-cols-2 gap-5 mt-5">
  <div class="p-6 bg-white/80 dark:bg-gray-800/80">
    内容
  </div>
</div>

<!-- 间距和尺寸 -->
<div class="p-4 mb-3 w-full h-50">
  内容
</div>

<!-- 排版 -->
<h1 class="text-2xl font-bold mb-2">标题</h1>
<p class="text-sm text-gray-600">描述</p>

<!-- 交互效果 -->
<div class="transition-all duration-300 hover:scale-105">
  内容
</div>
```

## 混合使用示例

### ✅ 正确：MDUI 组件 + Tailwind 辅助类

```astro
---
// ✅ 正确：MDUI 提供组件和主题，Tailwind 提供布局和间距
---

<mdui-card class="mdui-hoverable p-6 mb-5 rounded-lg">
  <div class="flex items-center gap-4">
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
        标题
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        描述
      </p>
    </div>
  </div>
</mdui-card>
```

### ❌ 错误：MDUI 主题使用 Tailwind

```astro
---
// ❌ 错误：不要用 Tailwind 覆盖 MDUI 主题
---

<!-- 错误：使用 Tailwind 覆盖主题色 -->
<mdui-card class="bg-blue-500 text-white">
  内容
</mdui-card>

<!-- 错误：使用 Tailwind 实现暗色模式 -->
<div class="dark:bg-gray-800">
  <mdui-card>内容</mdui-card>
</div>

<!-- 错误：混合主题系统 -->
<body class="mdui-theme-primary-pink bg-gray-100">
  内容
</body>
```

## 暗色模式处理

### ✅ 正确方式

```css
/* ✅ 正确：使用 MDUI 的暗色模式类名 */
:global(.mdui-theme-layout-dark) .my-component {
  background-color: rgba(66, 66, 66, 0.8);
  color: #fff;
}
```

```astro
---
// ✅ 正确：使用 Tailwind 的 dark: 修饰符
---

<div class="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white">
  内容
</div>
```

### ⚠️ 注意事项

Tailwind 的 `dark:` 修饰符默认基于 `class="dark"`，但项目中使用的是 `class="mdui-theme-layout-dark"`。

需要配置 Tailwind：

```css
/* src/styles/tailwind-extensions.css */
@import "tailwindcss";

@layer utilities {
  .mdui-theme-layout-dark .dark\:text-white {
    color: #fff;
  }
  
  .mdui-theme-layout-dark .dark\:bg-gray-800\/80 {
    background-color: rgba(66, 66, 66, 0.8);
  }
}
```

## 判断标准

### 是否可以使用 Tailwind？

**可以使用的场景：**
- ✅ 布局（grid, flex, gap）
- ✅ 间距（padding, margin）
- ✅ 尺寸（width, height）
- ✅ 排版（font-size, font-weight）
- ✅ 边框和圆角（border, border-radius）
- ✅ 过渡和动画（transition, animation）
- ✅ 透明度（opacity）
- ✅ 阴影（box-shadow）- 注意不要覆盖 MDUI 组件的阴影

**禁止使用的场景：**
- ❌ MDUI 主题颜色
- ❌ MDUI 组件的核心样式
- ❌ MDUI 的暗色模式实现
- ❌ 覆盖 MDUI 的 CSS 变量

## 代码审查检查清单

- [ ] MDUI 组件没有使用 Tailwind 的主题相关类
- [ ] 暗色模式使用 `:global(.mdui-theme-layout-dark)` 或 `dark:` 修饰符
- [ ] 没有覆盖 MDUI 的 CSS 变量
- [ ] 没有使用 Tailwind 覆盖 MDUI 组件的核心样式
- [ ] Tailwind 主要用于布局、间距、排版等辅助功能

## 相关文件

- `src/styles/global.css` - 全局样式和 MDUI 主题配置
- `src/styles/tailwind-theme.css` - Tailwind 主题配置
- `src/styles/tailwind-extensions.css` - Tailwind 扩展和暗色模式适配
