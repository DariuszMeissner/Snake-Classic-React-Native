import { NGame } from '../types/types';

export const APP_INIT: NGame.IApp = {
  step: {
    name: 'menu',
    menu: true,
    newGame: false,
    level: false,
    heighestScore: false,
    gameOver: false,
  },
  heighestScore: 0,
  currentScore: 0,
  speed: NGame.SpeedLevel.easy,
  currentLevel: {
    name: 'medium',
    veryHeight: false,
    height: false,
    medium: true,
    easy: false,
  },
};
