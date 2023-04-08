import React, { FC, useCallback, useEffect, useState } from 'react';
import Game from './game/Game';
import Menu from './menu/Menu';
import { MenuBestScore, MenuLevels } from './menu';
import { APP_INIT } from './root.data';
import { GameOver } from './game';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { NGame } from '../types/types';

interface IRootProps {
  storageBestScore: string;
}

const Root: FC<IRootProps> = ({ storageBestScore }) => {
  const { setItem } = useAsyncStorage('@storage_key');
  const [appState, setAppState] = useState<NGame.IApp>(APP_INIT);

  useEffect(() => {
    setAppState((prev) => ({ ...prev, heighestScore: Number(storageBestScore) }));
  }, []);

  const writeItemToStorage = async (score: string) => {
    await setItem(score);
  };

  function setCurrentLevel(currentLevel: NGame.TLevels): void {
    const levelAsIndex: keyof typeof NGame.SpeedLevel = currentLevel;

    setAppState((prev) => ({
      ...prev,
      speed: NGame.SpeedLevel[levelAsIndex],
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

  const goToStep = useCallback(
    (activeStep: NGame.TSteps): void => {
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
    },
    [appState.step]
  );

  const setHeighestScore = useCallback(
    (score: number): void => {
      const newScore = checkHeighestScore(score);
      const currentScore = score;

      setAppState((prev) => ({
        ...prev,
        heighestScore: newScore,
        currentScore,
      }));

      writeItemToStorage(newScore.toString());
    },
    [appState.currentScore]
  );

  function goToMenuAndSetLevel(currentLevel: NGame.TLevels): void {
    goToStep('menu');
    setCurrentLevel(currentLevel);
  }

  return (
    <View>
      {appState.step.menu && <Menu onPress={goToStep} />}

      {appState.step.newGame && (
        <Game
          speedOfGame={appState.speed}
          setHeighestScore={setHeighestScore}
          showGameOverScreen={goToStep}
          currentLevel={appState.currentLevel.name}
        />
      )}

      {appState.step.level && (
        <MenuLevels
          onPressSetLevel={goToMenuAndSetLevel}
          onPressGoToStep={goToStep}
          currentLevel={appState.currentLevel.name}
        />
      )}

      {appState.step.heighestScore && (
        <MenuBestScore onPress={goToStep} bestResult={appState.heighestScore} />
      )}

      {appState.step.gameOver && (
        <GameOver goToMenu={goToStep} currentResult={appState.currentScore} />
      )}
    </View>
  );
};

export default Root;
