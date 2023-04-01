import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Root from './app/Root';
import { CUSTOM_FONTS, SETTINGS_DEFAULT } from './constant/settingsDefault';
import { StatusBar } from 'expo-status-bar';

const TIME_OF_SPLASH_SCREEN = 1000;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [error, setError] = useState<any>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [storageScore, setStorageScore] = useState<string>('');
  const { getItem } = useAsyncStorage('@storage_key');

  const loadFont = async () => {
    await Font.loadAsync(CUSTOM_FONTS);
  };

  const extendShowingScreen = async () => {
    await new Promise((resolve) => setTimeout(resolve, TIME_OF_SPLASH_SCREEN));
  };

  const readItemFromStorage = async () => {
    const item = await getItem();

    if (item) {
      setStorageScore(item);
    }
  };

  const prepare = async () => {
    try {
      // Pre-load fonts, make any API calls you need to do here
      loadFont();
      readItemFromStorage();
      extendShowingScreen();
    } catch (err) {
      setError(err);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // at browser
  if (!appIsReady) {
    return (
      <View>
        <Text>My Splash Screen</Text>
      </View>
    );
  }

  return (
    <React.StrictMode>
      <SafeAreaProvider style={styles.app}>
        <SafeAreaView>
          <View nativeID="app">
            <View onLayout={onLayoutRootView}>
              <Root storageBestScore={storageScore} />
              <StatusBar style={'dark'} />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  app: {
    width: SETTINGS_DEFAULT.screenWidthMax,
    height: SETTINGS_DEFAULT.app.height,
    backgroundColor: SETTINGS_DEFAULT.colors.second,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
