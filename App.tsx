import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Root from './app/Root';
import { CUSTOM_FONTS, SETTINGS_DEFAULT } from './constant/settingsDefault';
import { StatusBar } from 'expo-status-bar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [storageScore, setStorageScore] = useState<string>('');
  const { getItem } = useAsyncStorage('@storage_key');

  const loadFont = async () => {
    await Font.loadAsync(CUSTOM_FONTS);
  };

  const readItemFromStorage = async () => {
    const item = await getItem();

    if (item) {
      setStorageScore(item);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        loadFont();
        readItemFromStorage();

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View>
        <Text>My Splash Screen</Text>
      </View>
    );
  }

  return (
    <React.StrictMode>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.root} onLayout={onLayoutRootView}>
            <Root storageBestScore={storageScore} />
            <StatusBar style={'dark'} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: SETTINGS_DEFAULT.colors.second,
    height: SETTINGS_DEFAULT.layout.height,
    width: SETTINGS_DEFAULT.layout.width,
  },
});
