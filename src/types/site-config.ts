import avatarImage from '../assets/home/logo.webp';
import backgroundImage from '../assets/home/bg.webp';
import sidebarImage from '../assets/home/sidebar.webp';

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export type NavItem = {
  name?: string;
  path?: string;
  type?: string;
  icon?: string;
  children?: NavItem[];
};

export type RandomImageConfig = {
  enable: boolean;
  ignoreHeroImage: boolean;
  url: string;
};

export type FooterConfig = {
  enable: boolean;
  customHtml?: string;
};

export type SiteConfig = {
  title: string;
  description: string;
  author: string;
  lang: string;
  avatar: string;
  background: string;
  sidebarBg: string;
  postBackground: string;
  sidebarBackground: string;
  glassmorphism: boolean;
  social: SocialLink[];
  nav: NavItem[];
  randomImage: RandomImageConfig;
};
