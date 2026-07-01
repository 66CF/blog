// ============================================
// 👇 在这里修改你的个人信息、项目和社交链接
// ============================================

// 个人信息
export const personalInfo = {
  name: "QTY",
  fullName: "QTY",
  avatarUrl: "/avatar.jpg",
  resumeUrl: "/resume",
};

// About 简介段落
export const aboutParagraphs = [
  "19 y/o cs undergrad",
  "i build things i wish existed, and they often end up being useful to other people too.",
  "i work across the stack: web, mobile, and the occasional clis/tuis.",
  "most of what i make ends up open source.",
  "into linux, ricing my setup, and understanding how things work past the surface.",
  "open to work <3",
];

// 社交链接
export const socialLinks = [
  { title: "github", username: "d1rshan", link: "https://github.com/d1rshan" },
  { title: "email", username: "darshan.paccha@gmail.com", link: "mailto:darshan.paccha@gmail.com" },
  { title: "discord", username: "d1rshan", link: "https://discord.gg/22rFFr8n" },
  { title: "linkedin", username: "darshan paccha", link: "https://www.linkedin.com/in/darshan-paccha/" },
  { title: "x", username: "@d1rshan", link: "https://x.com/d1rshan" },
];

// 项目列表
export const projects = [
  {
    title: "FuckWeici",
    description: "基于 uiautomator2 的维词安卓自动脚本",
    technologies: ["python"],
    link: "https://github.com/66CF/fuckweici",
  },
];

// 背景着色器参数 (CRT/Matrix 风格)
export const backgroundConfig = {
  scale: 3,
  gridMul: [2, 1],
  digitSize: 1.2,
  timeScale: 0.2,
  scanlineIntensity: 0.5,
  glitchAmount: 1,
  flickerAmount: 1,
  noiseAmp: 1,
  chromaticAberration: 0,
  dither: 0,
  curvature: 0.1,
  tint: [0.53, 0.94, 0.68], // #86efac green accent
  mouseReact: false,
  mouseStrength: 0.5,
  pageLoadAnimation: true,
  brightness: 0.5,
};

// 博客文章列表
export const blogPosts = [
  {
    slug: "baichuan",
    title: "赠马宁进京",
    date: "2026-04-05",
    excerpt: "百川不让留名",
    tags: ["poetry", "memory"],
  },
  {
    slug: "memory",
    title: "隔岸无旧情，姑苏有钟声。",
    date: "2025-12-07",
    excerpt: "木高的追忆",
    tags: ["memory"],
  },
  {
    slug: "lv-shi-chun-qiu",
    title: "吕氏春秋",
    date: "2025-12-06",
    excerpt: "班史闲摹太史文，春秋笔底记纷纭。笑谑藏真皆入卷，他年展处忆同云。",
    tags: ["history"],
  },
  {
    slug: "zero-2025",
    title: "天津高考数学",
    date: "2025-12-06",
    excerpt: "DeepSeek-V3.2-Speciale 解2025天津高考数学零点问题",
    tags: ["deepseek", "math"],
  },
  {
    slug: "jailbreak",
    title: "Jailbreak",
    date: "2025-05-03",
    excerpt: "Policy Puppetry Attack",
    tags: ["tech"],
  },
];

// 网站元数据
export const siteMeta = {
  title: "My Blog",
  description: "A personal blog",
  language: "zh-CN",
};
