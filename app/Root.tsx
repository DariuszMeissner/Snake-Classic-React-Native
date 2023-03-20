import React, { FC, useEffect, useState } from 'react';
import Game from './game/Game';
import Menu from './menu/Menu';
import { root } from './root.interface';
import { MenuBestScore, MenuLevels } from './menu';
import { APP_INIT } from './root.data';
import { GameOver } from './game';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';

interface IRootProps {
  storageBestScore: string;
}

const Root: FC<IRootProps> = ({ storageBestScore }) => {
  const { setItem } = useAsyncStorage('@storage_key');
  const [appState, setAppState] = useState<root.IApp>(APP_INIT);

  useEffect(() => {
    setAppState((prev) => ({ ...prev, heighestScore: Number(storageBestScore) }));
  }, []);

  const writeItemToStorage = async (score: string) => {
    await setItem(score);
  };

  function goToStep(activeStep: root.TSteps): void {
    setAppState((prev) => ({
      ...prev,
      step: {
        name: activeStep,
        menu: activeStep === 'menu',
        newGame: activeStep === 'new game',
        level: activeStep === 'levels',
        heighestScore: activeStep === 'highest score',
        gameOver: activeStep === 'gameOver',
      },
    }));
  }

  function setCurrentLevel(currentLevel: root.TLevels): void {
    const levelAsIndex: keyof typeof root.SpeedLevel = currentLevel;

    setAppState((prev) => ({
      ...prev,
      speed: root.SpeedLevel[levelAsIndex],
      currentLevel: {
        name: currentLevel,
        veryHeight: currentLevel === 'veryHeight',
        height: currentLevel === 'height',
        medium: currentLevel === 'medium',
        easy: currentLevel === 'easy',
      },
    }));
  }

  function checkHeighestScore(score: number): number {
    return score > appState.heighestScore ? score : appState.heighestScore;
  }

  function setHeighestScore(score: number): void {
    const newScore = checkHeighestScore(score);

    setAppState((prev) => ({
      ...prev,
      heighestScore: newScore,
    }));

    writeItemToStorage(newScore.toString());
  }

  function goToMenuAndSetLevel(currentLevel: root.TLevels): void {
    goToStep('menu');
    setCurrentLevel(currentLevel);
  }

  return (
    <View style={styles.rootContainer}>
      {appState.step.menu && <Menu onPress={goToStep} />}

      {appState.step.newGame && (
        <Game
          speedOfGame={appState.speed}
          setHeighestScore={setHeighestScore}
          showGameOverScreen={goToStep}
        />
      )}

      {appState.step.level && (
        <MenuLevels onPress={goToMenuAndSetLevel} currentLevel={appState.currentLevel.name} />
      )}

      {appState.step.heighestScore && (
        <MenuBestScore onPress={goToStep} bestResult={appState.heighestScore} />
      )}

      {appState.step.gameOver && <GameOver goToMenu={goToStep} />}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    margin: 'auto',
  },
});

export default Root;
