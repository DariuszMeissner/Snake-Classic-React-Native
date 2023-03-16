import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Game from './game/Game';
import Menu from './menu/Menu';
import { root } from './root.interface';
import { MenuBestScore, MenuLevels } from './menu';
import { APP_INIT } from './root.data';
import { GameOver } from './game';

const Root = () => {
  const [appState, setAppState] = useState<root.IApp>(APP_INIT);

  function goToStep(activeStep: root.TSteps): void {
    setAppState((prev) => ({
      ...prev,
      step: {
        name: activeStep,
        menu: activeStep === 'menu',
        newGame: activeStep === 'new game',
        level: activeStep === 'levels',
        highestScore: activeStep === 'highest score',
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
    return score > appState.highestScore ? score : appState.highestScore;
  }

  function setHighestScore(score: number): void {
    const newScore = checkHeighestScore(score);

    setAppState((prev) => ({
      ...prev,
      hightScore: newScore,
    }));
  }

  function goToMenuAndSetLevel(currentLevel: root.TLevels): void {
    goToStep('menu');
    setCurrentLevel(currentLevel);
  }

  return (
    <SafeAreaProvider style={{ margin: 'auto' }}>
      {appState.step.menu && <Menu onPress={goToStep} />}

      {appState.step.newGame && (
        <Game
          speedOfGame={appState.speed}
          setHeighestScore={setHighestScore}
          showGameOverScreen={goToStep}
        />
      )}

      {appState.step.level && (
        <MenuLevels onPress={goToMenuAndSetLevel} currentLevel={appState.currentLevel.name} />
      )}

      {appState.step.highestScore && (
        <MenuBestScore onPress={goToStep} bestResult={appState.highestScore} />
      )}

      {appState.step.gameOver && <GameOver goToMenu={goToStep} />}

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default Root;
