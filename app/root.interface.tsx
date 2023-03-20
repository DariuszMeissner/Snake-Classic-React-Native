export namespace root {
  export type TLevels = 'veryHeight' | 'height' | 'medium' | 'easy';
  export type TSteps = 'menu' | 'new game' | 'levels' | 'highest score' | 'gameOver';
  export type TSpeed = 30 | 60 | 120 | 240;

  export enum SpeedLevel {
    veryHeight = 30,
    height = veryHeight * 2,
    medium = height * 2,
    easy = medium * 2,
  }

  export interface IApp {
    heighestScore: number;
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
