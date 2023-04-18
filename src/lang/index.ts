//引入国际化
import {createI18n} from 'vue-i18n'
import Cookies from 'js-cookie';
import elementEnLocale from 'element-plus/lib/locale/lang/en';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';

//中文国际化
import zhLocal from './zh'
//英文国际化
import enLocal from './en'

const langKey = 'i18nLang-key';

const messages = {
  'en': {
      ...enLocal,
      ...elementEnLocale,
  },
  'zh': {
      ...zhLocal,
      ...elementZhLocale,
  }
};

export const getCurrentLanguage = () => {
  return Cookies.get(langKey);
};
export const setCurrentLanguage = (lang: string) => {
  return Cookies.set(langKey, lang);
};
export const getLocale = () => {
  const cookieLanguage = getCurrentLanguage();
  if (cookieLanguage) {
      return cookieLanguage;
  }
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);    
  for (const locale of locales) {
      if (language.indexOf(locale) > -1) {
          return locale;
      }
  }
  return 'zh';
};

const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: 'zh',// 不存在默认则为中文
  allowComposition: true,// 允许组合式api
  messages: messages
});

export default i18n;

