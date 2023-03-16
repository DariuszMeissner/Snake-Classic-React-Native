export namespace root {
  export type TLevels = 'veryHeight' | 'height' | 'medium' | 'easy';
  export type TSteps = 'menu' | 'new game' | 'levels' | 'highest score' | 'gameOver';
  export type TSpeed = 50 | 100 | 200 | 300;

  export enum SpeedLevel {
    veryHeight = 50,
    height = 100,
    medium = 200,
    easy = 300,
  }

  export interface IApp {
    highestScore: number;
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
      highestScore: boolean;
      gameOver: boolean;
    };
  }
}
