// ============================================
//  Site Data — edit this file to customize
// ============================================

import { Github, Mail, Discord, Linkedin, X, File } from "../components/Icons";

export const personalInfo = {
  name: "QTY",
  fullName: "QTY",
  avatarUrl: "/avatar.jpg",
};

export const aboutParagraphs = [
  ["19 y/o cs undergrad", "br", "i build things i wish existed, and they often end up being useful to other people too."],
  ["i work across the stack: web, mobile, and the occasional clis/tuis.", "br", "most of what i make ends up open source."],
  "into linux, ricing my setup, and understanding how things work past the surface.",
  "open to work <3",
];

export const projects = [
  {
    title: "FuckWeici",
    description: "基于 uiautomator2 的维词安卓自动脚本",
    technologies: ["python"],
    link: "https://github.com/66CF/fuckweici",
  },
];

export const socialLinks = [
  { title: "github", username: "66CF", link: "https://github.com/66CF", icon: Github },
  { title: "email", username: "3202714166@qq.com", link: "mailto:3202714166@qq.com", icon: Mail },
  { title: "bilibili", username: "621504283", link: "https://space.bilibili.com/621504283", icon: Discord },
  { title: "resume", username: "resume", link: "/resume", icon: File },
];

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
    excerpt: "班史闲摹太史文，春秋笔底记纷纭。",
    tags: ["history"],
  },
  {
    slug: "zero-2025",
    title: "天津高考数学",
    date: "2025-12-06",
    excerpt: "DeepSeek 解2025天津高考数学零点问题",
    tags: ["math"],
  },
  {
    slug: "jailbreak",
    title: "Jailbreak",
    date: "2025-05-03",
    excerpt: "Policy Puppetry Attack",
    tags: ["tech"],
  },
];

// Theme options
export const themes = [
  { name: "green", color: "#86efac" },
  { name: "purple", color: "#c084fc" },
  { name: "blue", color: "#93c5fd" },
  { name: "orange", color: "#fdba74" },
  { name: "pink", color: "#f9a8d4" },
];
