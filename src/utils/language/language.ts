import * as SecureStore from "expo-secure-store";
export const setLang = (lang: string) => {
  try {
    SecureStore.setItem("lang", lang);
  } catch (error) {
    SecureStore.setItem("lang", "en");
  }
};

export const getLang = (): string => {
  try {
    const lang = SecureStore.getItem("lang");
    return lang || "en";
  } catch (error) {
    return "en";
  }
};
