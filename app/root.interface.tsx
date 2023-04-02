export namespace NRoot {
  export type TLevels = 'veryHeight' | 'height' | 'medium' | 'easy';
  export type TSteps = 'menu' | 'new game' | 'levels' | 'highest score' | 'gameOver';
  export type TSpeed = 30 | 60 | 120 | 240;

  export enum SpeedLevel {
    veryHeight = 10,
    height = 50,
    medium = 100,
    easy = 150,
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
