import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameBoard, GameControl, GameScores, GameWarning } from '.';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';
import { root } from '../root.interface';
import { GameSettings } from './game.interface';

interface IGame {
  speedOfGame: number;
  setHeighestScore: (score: number) => void;
  showGameOverScreen: (activeStep: root.TSteps) => void;
}

const Game: FC<IGame> = ({ speedOfGame, setHeighestScore, showGameOverScreen }) => {
  const intervalRef = useRef<any>(null);
  const [board, setBoard] = useState<GameSettings.IBoard>({
    rows: generateRows(),
    snakeBody: [SETTINGS_DEFAULT.snakeStartPosition],
    food: generatePosition(),
    direction: 'right',
    lastDirection: 'right',
    gameOver: false,
    points: 0,
    gameIsStopped: false,
  });

  function generateRows(): string[][] {
    return [...Array(SETTINGS_DEFAULT.layout.board.numberOfRows)].map((_) =>
      [...Array(SETTINGS_DEFAULT.layout.board.numberOfColumn)].map((_) => 'gridItem')
    );
  }

  function setColorOfBoardElements(val: string): string {
    return val === 'snakeBody' || val === 'food'
      ? SETTINGS_DEFAULT.colors.main
      : SETTINGS_DEFAULT.colors.second;
  }

  function drawBoard(): JSX.Element[][] {
    return board.rows.map((row, i) =>
      row.map((value, j) =>
        j === SETTINGS_DEFAULT.layout.board.numberOfColumn - 1 ? (
          <View key={`${i * j * j}`} style={styles.gridBreak} />
        ) : (
          <View
            key={`${i}-${j}`}
            nativeID={`${i}-${j}`}
            style={{ ...styles.gridItem, backgroundColor: setColorOfBoardElements(value) }}
          />
        )
      )
    );
  }

  function generatePosition(): GameSettings.ICordinates {
    return {
      x: Math.floor(Math.random() * SETTINGS_DEFAULT.layout.board.numberOfRows),
      y: Math.floor(Math.random() * SETTINGS_DEFAULT.layout.board.numberOfColumn),
    };
  }

  function saveLastDirection(direction: GameSettings.TDirection): void {
    if (direction != 'stop') {
      setBoard((prev) => ({ ...prev, lastDirection: direction }));
    }
  }

  function changeDirection(key: GameSettings.TDirection): void {
    let currentDirection: GameSettings.TDirection = board.direction;

    if (board.direction != 'stop') {
      if (key === 'left') currentDirection = board.direction === 'right' ? 'right' : 'left';
      if (key === 'right') currentDirection = board.direction === 'left' ? 'left' : 'right';
      if (key === 'up') currentDirection = board.direction === 'down' ? 'down' : 'up';
      if (key === 'down') currentDirection = board.direction === 'up' ? 'up' : 'down';
      if (key === 'stop') currentDirection = 'stop';
    }
    if (key === 'start') {
      currentDirection = board.lastDirection;
      resumeGame();
    }
    setBoard((prev) => ({ ...prev, direction: currentDirection }));

    saveLastDirection(currentDirection);
  }

  function updateFrame(): void {
    let newRows = generateRows();

    // set position food and snakebody
    board.snakeBody.forEach((el) => (newRows[el.x][el.y] = 'snakeBody'));
    newRows[board.food.x][board.food.y] = 'food';

    setBoard((prev) => ({ ...prev, rows: newRows }));
  }

  function moveSnake(): void {
    if (board.gameOver) {
      return;
    }

    const { numberOfColumn, numberOfRows } = SETTINGS_DEFAULT.layout.board;
    let newSnakeBody = board.snakeBody;
    let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };

    if (board.direction === 'left') snakeHead.y += -1;
    if (board.direction === 'right') snakeHead.y += 1;
    if (board.direction === 'up') snakeHead.x += -1;
    if (board.direction === 'down') snakeHead.x += 1;

    if (snakeHead.x < 0) snakeHead.x = numberOfRows - 1;
    if (snakeHead.x >= numberOfRows) snakeHead.x = 0;
    if (snakeHead.y < 0) snakeHead.y = numberOfColumn - 1;
    if (snakeHead.y >= numberOfColumn) snakeHead.y = 0;

    newSnakeBody.push(snakeHead);
    newSnakeBody.shift();

    setBoard((prev) => ({ ...prev, snakeBody: newSnakeBody }));

    updateFrame();
  }

  function onEatingFood(): void {
    const { numberOfColumn, numberOfRows } = SETTINGS_DEFAULT.layout.board;
    let newPositionFood = generatePosition();
    let newSnakeBody = board.snakeBody;
    let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };
    const { food } = board;

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      newSnakeBody.push(snakeHead);

      updateScores();

      // check colision food with snake
      // and generate new one
      for (let i = 0; i < newSnakeBody.length; i++) {
        if (newSnakeBody[i].x === newPositionFood.x) {
          newPositionFood.x = Math.floor(Math.random() * numberOfRows);
        }

        if (newSnakeBody[i].y === newPositionFood.y) {
          newPositionFood.y = Math.floor(Math.random() * numberOfColumn);
        }
      }

      setBoard((prev) => ({ ...prev, snakeBody: newSnakeBody, food: newPositionFood }));
    }
  }

  function updateScores(): void {
    setBoard((prev) => ({ ...prev, points: prev.points + 1 }));
  }

  function detectCollisionSnakeAtSnake(): void {
    const { snakeBody } = board;
    let snakeHead = { ...snakeBody[snakeBody.length - 1] };

    for (let i = 0; i < snakeBody.length - 3; i++) {
      let isColision = snakeHead.x === snakeBody[i].x && snakeHead.y === snakeBody[i].y;
      if (isColision) {
        setBoard((prev) => ({ ...prev, gameOver: true }));
      }
    }
  }

  function resumeGame(): void {
    setBoard((prev) => ({ ...prev, gameIsStopped: false }));
  }

  function stopGame() {
    clearInterval(intervalRef.current);
  }

  function gameOver(): void {
    setHeighestScore(board.points);
    showGameOverScreen('gameOver');
  }

  useEffect(() => {
    if (board.direction === 'stop') {
      setBoard((prev) => ({ ...prev, gameIsStopped: true }));
    }
  }, [board.direction]);

  useEffect(() => {
    if (!board.gameOver) {
      intervalRef.current = setInterval(moveSnake, speedOfGame);
      onEatingFood();
      detectCollisionSnakeAtSnake();
    }

    if (board.direction === 'stop') {
      stopGame();
    }

    if (board.gameOver) {
      clearInterval(intervalRef.current);
      gameOver();
    }

    return () => clearInterval(intervalRef.current);
  }, [board]);

  return (
    <View style={styles.gameContainer}>
      <GameScores result={board.points} />
      <GameBoard>{drawBoard()}</GameBoard>
      <GameControl changeDirection={changeDirection} currentDirection={board.direction} />

      {board.gameIsStopped && <GameWarning />}
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridBreak: {
    flexBasis: '100%',
    height: 0,
  },
  gridItem: {
    width: SETTINGS_DEFAULT.layout.board.blockSize,
    height: SETTINGS_DEFAULT.layout.board.blockSize,
  },
  snakeBody: {
    width: SETTINGS_DEFAULT.layout.board.blockSize,
    height: SETTINGS_DEFAULT.layout.board.blockSize,
  },
  food: {
    width: SETTINGS_DEFAULT.layout.board.blockSize,
    height: SETTINGS_DEFAULT.layout.board.blockSize,
  },
});

export default Game;
