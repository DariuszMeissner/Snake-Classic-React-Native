export namespace GameSettings {
  export interface IBoard {
    rows: string[][];
    snakeBody: ICordinates[];
    food: ICordinates;
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
