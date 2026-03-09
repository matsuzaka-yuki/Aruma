import { siteConfig } from "../site.config";
import type I18nKey from "./i18nKey";
import { zhCN } from "./languages/zh-CN";
import { zhTW } from "./languages/zh-TW";
import { en } from "./languages/en";
import { ja } from "./languages/ja";

// 类型定义：确保所有语言文件包含完整的翻译键
export type Translation = {
    [K in I18nKey]: string;
};

// 默认语言
const defaultTranslation = zhCN;

// 语言映射表
const map: { [key: string]: Translation } = {
    "zh-cn": zhCN,
    "zh_cn": zhCN,
    "zh": zhCN,
    "zh-tw": zhTW,
    "zh_tw": zhTW,
    "en": en,
    "en-us": en,
    "en_us": en,
    "ja": ja,
    "ja-jp": ja,
    "ja_jp": ja,
};

// 获取翻译对象
export function getTranslation(lang: string): Translation {
    const normalizedLang = lang.toLowerCase();
    return map[normalizedLang] || defaultTranslation;
}

// 核心 i18n 函数
export function i18n(key: I18nKey, params?: Record<string, string | number>): string {
    const lang = siteConfig.lang || "zh-cn";
    let text = getTranslation(lang)[key];
    
    // 替换参数占位符
    if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
            text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
        });
    }
    
    return text;
}
