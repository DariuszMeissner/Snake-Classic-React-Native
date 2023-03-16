import { root } from './root.interface';

export const APP_INIT: root.IApp = {
  step: {
    name: 'menu',
    menu: true,
    newGame: false,
    level: false,
    highestScore: false,
    gameOver: false,
  },
  highestScore: 0,
  speed: root.SpeedLevel.medium,
  currentLevel: {
    name: 'medium',
    veryHeight: false,
    height: false,
    medium: true,
    easy: false,
  },
};
