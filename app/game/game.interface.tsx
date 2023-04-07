export namespace NGame {
  export interface IBoard {
    rows: string[][] | null;
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

  export type TDirection = 'left' | 'right' | 'up' | 'down' | 'stop' | 'start';
}
