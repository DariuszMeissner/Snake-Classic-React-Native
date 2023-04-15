import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Root from './app/Root';
import { CUSTOM_FONTS, INIT } from './constant/settingsDefault';
import { StatusBar } from 'expo-status-bar';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { getDeviceTypeAsync } from 'expo-device';

const TIME_OF_SPLASH_SCREEN = 1000;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [error, setError] = useState<any>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [storageScore, setStorageScore] = useState<string>('');
  const { getItem } = useAsyncStorage('@storage_key');

  useEffect(() => {
    prepareApp();
  }, []);

  async function extendShowingScreen() {
    await new Promise((resolve) => setTimeout(resolve, TIME_OF_SPLASH_SCREEN));
  }

  async function readItemFromStorage() {
    const item = await getItem();
    if (item) setStorageScore(item);
  }

  async function prepareApp() {
    try {
      // Pre-load fonts, make any API calls you need to do here
      await Font.loadAsync(CUSTOM_FONTS);
      readItemFromStorage();
      extendShowingScreen();
    } catch (err) {
      setError(err);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // at browser
  if (!appIsReady) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Something went wrong!</Text>
        <Text>Please reloade application later.</Text>
      </View>
    );
  }

  return (
    <React.StrictMode>
      <SafeAreaProvider style={styles.app}>
        <SafeAreaView>
          <View>
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
    width: responsiveScreenWidth(100),
    height: INIT.app.maxHeight,
    backgroundColor: INIT.colors.second,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  root: {
    width: INIT.app.maxWidth,
  },
});
