# 代码格式化策略

本项目参考 Mizuki 项目的代码格式化策略，使用 Prettier 进行代码格式化。

## 配置文件

- `.prettierrc` - Prettier 配置
- `.prettierignore` - 忽略文件列表
- `.editorconfig` - 编辑器配置

## 格式化规则

### 基本配置

- 使用制表符 (Tab) 缩进
- 制表符宽度: 4
- 每行最大字符数: 80
- 行尾: CRLF (Windows)
- 使用双引号
- 语句末尾添加分号
- 尾随逗号: 所有情况都添加
- 箭头函数参数始终使用括号

### CSS 特殊规则

CSS 文件使用不同的格式化规则：
- 使用空格缩进
- 缩进宽度: 2
- 每行最大字符数: 200

## 使用方法

### 格式化代码

```bash
# 格式化所有源代码
pnpm format

# 或使用 prettier 直接格式化
npx prettier --write ./src
```

### 检查代码格式

```bash
# 检查代码格式（不修改文件）
pnpm lint

# 或使用 prettier 直接检查
npx prettier --check ./src
```

### 特殊文件处理

`src/components/Header.astro` 由于包含内联脚本的特殊语法，暂时从格式化中排除。如需格式化此文件，请手动处理。

## 编辑器集成

建议在编辑器中安装 Prettier 扩展并启用"Format on Save"功能。

### VS Code

1. 安装 `Prettier - Code formatter` 扩展
2. 在 `.vscode/settings.json` 中添加：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "editor.insertSpaces": false
}
```

### WebStorm / IntelliJ IDEA

1. 安装 Prettier 插件
2. 设置 Prettier 为默认格式化工具
3. 启用 "Run on save" 选项

## Git 钩子 (可选)

可以使用 `lint-staged` 和 `husky` 在提交前自动格式化代码：

```bash
pnpm add -D husky lint-staged
npx husky init
```

在 `.husky/pre-commit` 中添加：

```bash
pnpm lint-staged
```

在 `package.json` 中添加配置：

```json
{
  "lint-staged": {
    "./src/**/*.{astro,js,ts,jsx,tsx,css,json}": [
      "prettier --write"
    ]
  }
}
```
