export namespace NGame {
  export type TLevels = 'veryHeight' | 'height' | 'medium' | 'easy';
  export type TSteps = 'menu' | 'new game' | 'levels' | 'highest score' | 'gameOver';
  export type TDirection = 'left' | 'right' | 'up' | 'down' | 'stop' | 'start';
  export type TSize = '14' | '16' | '18' | '20';

  export enum SpeedLevel {
    veryHeight = 1,
    height = 35,
    medium = 55,
    easy = 100,
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

  export interface IBoard {
    snakeBody: ICordinates[];
    food: ICordinates | null;
    direction: TDirection;
    lastDirection: TDirection;
    gameOver: boolean;
    points: number;
    gameIsStopped: boolean;
  }

  export interface ICordinates {
    x: number;
    y: number;
  }
}
