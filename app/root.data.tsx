import { NRoot } from './root.interface';

export const APP_INIT: NRoot.IApp = {
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
  speed: NRoot.SpeedLevel.medium,
  currentLevel: {
    name: 'medium',
    veryHeight: false,
    height: false,
    medium: true,
    easy: false,
  },
};
