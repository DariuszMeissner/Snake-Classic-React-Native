import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameBoard, GameControl, GameScores, GameWarning } from '.';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';
import { root } from '../root.interface';
import { GameSettings } from './game.interface';
import { BLOCK_SIZE, INIT_SETTINGS } from './game.data';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { TextCustom } from '../../components';

interface IGame {
  speedOfGame: number;
  setHeighestScore: (score: number) => void;
  showGameOverScreen: (activeStep: root.TSteps) => void;
}

const Game: FC<IGame> = ({ speedOfGame, setHeighestScore, showGameOverScreen }) => {
  const intervalRef = useRef<any>(null);
  const [board, setBoard] = useState<GameSettings.IBoard>({
    rows: generateRows(),
    snakeBody: [INIT_SETTINGS.board.snakeStartPosition],
    food: generatePosition(),
    direction: 'right',
    lastDirection: 'right',
    gameOver: false,
    points: 0,
    gameIsStopped: false,
  });

  function generateRows(): string[][] {
    return [...Array(INIT_SETTINGS.board.height)].map((_) =>
      [...Array(INIT_SETTINGS.board.width)].map((_) => 'gridItem')
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
        j === INIT_SETTINGS.board.width ? (
          <View key={`${i * j * j}`} style={styles.gridBreak} />
        ) : (
          <View
            key={`${i}-${j}`}
            style={{ ...styles.gridItem, backgroundColor: setColorOfBoardElements(value) }}
          />
        )
      )
    );
  }

  function generatePosition(): GameSettings.ICordinates {
    return {
      x: Math.floor(Math.random() * INIT_SETTINGS.board.height),
      y: Math.floor(Math.random() * INIT_SETTINGS.board.width),
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

    const { width, height } = INIT_SETTINGS.board;
    let newSnakeBody = board.snakeBody;
    let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };

    if (board.direction === 'left') snakeHead.y += -1;
    if (board.direction === 'right') snakeHead.y += 1;
    if (board.direction === 'up') snakeHead.x += -1;
    if (board.direction === 'down') snakeHead.x += 1;

    if (snakeHead.x < 0) snakeHead.x = height - 1;
    if (snakeHead.x >= height) snakeHead.x = 0;
    if (snakeHead.y < 0) snakeHead.y = width - 1;
    if (snakeHead.y >= width) snakeHead.y = 0;

    newSnakeBody.push(snakeHead);
    newSnakeBody.shift();

    setBoard((prev) => ({ ...prev, snakeBody: newSnakeBody }));

    updateFrame();
  }

  function onEatingFood(): void {
    let newSnakeBody = board.snakeBody;
    let newPositionFood = generatePosition();
    let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };
    const { food } = board;

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      newSnakeBody.push(snakeHead);

      updateScores();

      // check colision food with snake
      // and generate new one
      for (let i = 0; i < newSnakeBody.length; i++) {
        if (newSnakeBody[i].x === newPositionFood.x) {
          newPositionFood.x = Math.floor(Math.random() * INIT_SETTINGS.board.height);
        }

        if (newSnakeBody[i].y === newPositionFood.y) {
          newPositionFood.y = Math.floor(Math.random() * INIT_SETTINGS.board.width);
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
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  },
  snakeBody: {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  },
  food: {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  },
});

export default Game;
