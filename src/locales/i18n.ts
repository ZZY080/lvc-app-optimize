import cn from "@locales/languages/cn.json";
import en from "@locales/languages/en.json";
import { getLang } from "@utils/language/language";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const finalLanguage = getLang();
// 设置i18next设置
i18n.use(initReactI18next).init({
  resources: {
    en: en,
    cn: cn, // cn  是简体中文  zh 是繁体中文
  },
  lng: finalLanguage, // 设置语言
  fallbackLng: "en", // 如果某些翻译模块缺失，使用的后备语言
  interpolation: {
    escapeValue: false, // React已经处理了XSS
  },
});

export default i18n;
