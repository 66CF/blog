# d1rshan — QTY 的个人博客

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19"></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-deployed-black?logo=vercel&logoColor=white" alt="Vercel"></a>
  <a href="#"><img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white" alt="pnpm"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License"></a>
</p>

基于 **React 19** + **Vite 6** + **Tailwind CSS 4** 构建的个人博客 & 作品集。

## ✨ 功能特性

- **WebGL 动态背景** — 使用 [ogl](https://github.com/oframe/ogl) 渲染的矩阵数字雨风格背景，支持鼠标交互和主题色联动
- **多主题切换** — 内置绿/紫/蓝/橙/粉五种主题色，按 `T` 键或点击即可切换
- **Markdown 博客** — 基于 `react-markdown`，支持 GFM 表格、HTML 标签等扩展语法
- **响应式设计** — 适配桌面端与移动端
- **动画组件** — 包含 FuzzyText、ComicText、AnimatedText 等多种文字特效
- **Vercel 部署** — 一键部署，SPA 路由已配置

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建工具 | Vite 6 |
| 样式 | Tailwind CSS 4 |
| 路由 | React Router DOM 7 |
| 动画 | Framer Motion |
| WebGL | ogl |
| Markdown | react-markdown + remark-gfm + rehype-raw |
| 部署 | Vercel |

## 🚀 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📁 项目结构

```
blog/
├── public/              # 静态资源（favicon、头像等）
├── src/
│   ├── components/      # 通用组件
│   │   ├── Background.jsx      # WebGL 背景
│   │   ├── AnimatedText.jsx    # 动画文字
│   │   ├── ComicText.jsx       # 漫画风格文字
│   │   ├── FuzzyText.jsx       # 模糊文字特效
│   │   ├── PannellumViewer.jsx # 全景照片查看器
│   │   └── ...
│   ├── pages/           # 路由页面
│   │   ├── Home.jsx           # 首页（关于、精选项目、最近文章）
│   │   ├── Projects.jsx       # 项目列表
│   │   ├── Blog.jsx           # 博客列表
│   │   └── BlogPost.jsx       # 文章详情
│   ├── data/
│   │   ├── config.js          # 站点配置（个人信息、项目、社交链接、博客列表）
│   │   └── blog-posts/        # Markdown 博文
│   ├── hooks/
│   │   └── useTheme.jsx       # 主题切换 Hook
│   ├── App.jsx                # 路由配置
│   ├── main.jsx               # 应用入口
│   └── index.css              # 全局样式
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

## ⚙️ 自定义配置

编辑 `src/data/config.js` 即可修改站点信息：

- `personalInfo` — 昵称、头像
- `aboutParagraphs` — 个人介绍
- `projects` — 项目列表
- `socialLinks` — 社交链接
- `blogPosts` — 博客文章元数据
- `themes` — 主题色

博客文章以 Markdown 格式存放在 `src/data/blog-posts/` 目录下，在 `config.js` 的 `blogPosts` 数组中添加对应条目即可发布新文章。

## 📄 License

MIT
