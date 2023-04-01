export namespace NRoot {
  export type TLevels = 'veryHeight' | 'height' | 'medium' | 'easy';
  export type TSteps = 'menu' | 'new game' | 'levels' | 'highest score' | 'gameOver';
  export type TSpeed = 30 | 60 | 120 | 240;

  export enum SpeedLevel {
    veryHeight = 45,
    height = veryHeight * 1.5,
    medium = height * 1.5,
    easy = medium * 1.5,
  }

  export enum PointRate {
    easy = 0.5,
    medium = 1,
    height = 2,
    veryHeight = 4,
  }

  export interface IApp {
    heighestScore: number;
    currentScore: number;
    speed: number;
    currentLevel: {
      name: TLevels;
      veryHeight: boolean;
      height: boolean;
      medium: boolean;
      easy: boolean;
    };
    step: {
      name: TSteps;
      menu: boolean;
      newGame: boolean;
      level: boolean;
      heighestScore: boolean;
      gameOver: boolean;
    };
  }
}
