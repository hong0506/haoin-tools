# Haoin Tools

A modern online tools collection website providing various practical utilities.

## Project Overview

**Haoin Tools** (https://haointools.com) is a feature-rich online tools platform, providing convenient tool services for developers, designers and all users.

**Operated by:** Haoin Tech Co., Ltd.
**Contact:** contact@haoin.tech  
**Domains:** haointools.com | haoin.tech

## 技术栈

本项目使用以下技术构建：

- **Vite** - 现代化的前端构建工具
- **TypeScript** - 类型安全的 JavaScript 超集
- **React** - 用户界面库
- **shadcn/ui** - 精美的 UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架

## 安装和运行

### 前置要求

- Node.js 16+
- npm 或 yarn

### 本地开发

```sh
# 1. 克隆仓库
git clone <YOUR_GIT_URL>

# 2. 进入项目目录
cd haoin-tools

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

### 构建生产版本

```sh
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 功能特性

### 💰 金融工具

- 贷款计算器
- 利息计算器
- 投资计算器
- 货币转换器
- 信用卡计算器

### 🔧 实用工具

- 单位转换器
- 年龄计算器
- 日期计算器
- 随机选择器

### 🖼️ 图像工具

- 图片压缩器
- 图片大小调整
- 颜色选择器

### 📝 文本工具

- 大小写转换
- 字数统计
- 文本对比
- 文本排序
- Markdown 预览

### 🔄 转换工具

- Base64 编解码
- URL 编解码
- JSON 格式化
- HTML 转文本
- CSV 转 JSON
- 时间戳转换

### 🎲 生成器工具

- UUID 生成器
- 密码生成器
- 二维码生成器
- Lorem Ipsum 生成器
- 哈希生成器

### 🧮 计算器工具

- 百分比计算器
- BMI 计算器

### 💻 开发工具

- 正则表达式测试器
- JSON 格式化器
- 哈希生成器

## 项目结构

```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
│   └── tools/    # 各种工具页面
├── i18n/          # 国际化配置和翻译文件
│   ├── config.ts # i18next 配置
│   └── locales/  # 翻译 JSON 文件 (10 种语言)
├── data/          # 数据配置
├── lib/           # 工具函数
└── types/         # TypeScript 类型定义
```

## 🌍 国际化 (i18n)

本项目支持 10 种语言：英语、中文、西班牙语、葡萄牙语、印尼语、越南语、法语、德语、日语、韩语

### 开发命令

```bash
# 检查翻译覆盖率
npm run i18n:check

# 生成翻译模板
npm run i18n:template

# 提取硬编码字符串
npm run i18n:extract

# 机器翻译（需要 API key）
npm run i18n:translate

# CI 检查（未完成时失败）
npm run i18n:check:ci
```

### 机器翻译设置

1. 复制环境变量模板：
```bash
cp .env.example .env
```

2. 添加 API key（选择一个）：
```bash
# OpenAI (推荐)
OPENAI_API_KEY=sk-proj-your-key-here

# 或 Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

3. 运行翻译：
```bash
# 翻译所有语言
npm run i18n:translate

# 翻译单个语言
npm run i18n:translate -- --locale=zh

# 使用 Claude
npm run i18n:translate -- --provider=anthropic
```

**详细文档：** 查看 [`TRANSLATION_CLI_GUIDE.md`](./TRANSLATION_CLI_GUIDE.md)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
