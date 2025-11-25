import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import authReducer from "./slices/authSlice";
import languageReducer from "./slices/languageSlice";

import asyncStorage from "@react-native-async-storage/async-storage";

// 配置 persist
const persistConfig = {
  key: "root",
  storage: asyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer({ key: "auth", storage: asyncStorage }, authReducer), // 只对auth 持久化
  language: persistReducer(
    { key: "language", storage: asyncStorage },
    languageReducer
  ), // 只对language持久化
});

// 配置 Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 关闭序列化检查（持久化需要）
    }),
});

// 配置 persistor
export const persistor = persistStore(store);

// 定义 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
