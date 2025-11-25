import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import "@locales/i18n";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../global.css";
import { AppThemeProvider } from "../contexts/app-theme-context";
import { persistor, store } from "../redux/store";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function Layout() {
  const fonts = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fonts) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
            <AppThemeProvider>
              <HeroUINativeProvider
                config={{
                  textProps: {
                    allowFontScaling: false,
                  },
                }}
              >
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="solution/[id]"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="course/[slug]"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="course/instance/[id]"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="my/course"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="my/product"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="my/order"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="my/profile"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="my/privacy-policy"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="setting/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="setting/password"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="setting/language"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="setting/delete-account"
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="auth/login"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </HeroUINativeProvider>
            </AppThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
