import avatarImage from './assets/home/logo.webp';
import backgroundImage from './assets/home/bg.webp';
import sidebarImage from './assets/home/sidebar.webp';
import type { SiteConfig } from './types/site-config';

export const siteConfig: SiteConfig = {
  title: "有希",
  description: "有希的个人博客",
  author: "有希",
  lang: "zh-cn", // 语言配置：支持 "zh-cn"（中文）、"zh-tw"（繁体中文）、"en"（英文）和 "ja"（日文）
  avatar: avatarImage.src,
  background: backgroundImage.src,
  sidebarBg: sidebarImage.src,
  postBackground: "rgba(255, 255, 255, 0.7)", // 文章背景色 (带透明度)
  sidebarBackground: "rgba(255, 255, 255, 0.8)", // 侧边栏背景色
  glassmorphism: true,
  social: [
    { name: "GitHub", url: "https://github.com/nut612", icon: "github" },
    { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { name: "Email", url: "mailto:example@email.com", icon: "email" },
  ],
  nav: [
    { name: "home", path: "/", icon: "home" },
    { type: "category", icon: "widgets" },
    { type: "archive", icon: "access_time" },
    { name: "friends", path: "/friends", icon: "link" },
    { name: "anime", path: "/anime", icon: "movie" },
    { name: "diary", path: "/diary", icon: "book" },
    { name: "devices", path: "/devices", icon: "devices" },
    {
      name: "other",
      path: "javascript:;",
      icon: "folder",
      children: [
        { name: "about", path: "/about" },
      ]
    },
  ],

  // { type: "divider" } ky1 分隔线
  // { type: "category", icon: "widgets" }, ky2 归档
  // { type: "archive", icon: "access_time" }, ky3 分类

  randomImage: {
    enable: true,
    ignoreHeroImage: true, // 设为 true 时，即使文章设置了 heroImage 也会强制使用随机图
    url: "https://www.loliapi.com/acg/pc", // 默认使用随机二次元图片 API
  }
};

export const footerConfig = {
  enable: false,
  customHtml: "",
  // 也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
  // 注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
};
