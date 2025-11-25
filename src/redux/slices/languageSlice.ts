import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLang } from "@utils/language/language";

export interface LanguageState {
  languageIndex: number;
  lang: "en" | "cn";
}
const initialState: LanguageState = {
  languageIndex: 0,
  lang: "en",
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // 切换语言
    switchLanguage(state, action: PayloadAction<any>) {
      state.languageIndex = action.payload.languageIndex;
      state.lang = action.payload.lang;
      setLang(action.payload.lang);
    },
  },
});

export const { switchLanguage } = languageSlice.actions;
export default languageSlice.reducer;
