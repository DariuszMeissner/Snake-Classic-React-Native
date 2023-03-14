import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Game from './game/Game';
import { View } from 'react-native';

const Root = () => {
  return (
    <>
      <Game />

      <StatusBar style="auto" />
    </>
  );
};

export default Root;
