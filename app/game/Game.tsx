import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameBoard, GameControl, GameScores, GameWarning } from '.';
import { INIT } from '../../constant/settingsDefault';
import { NGame } from '../../types/types';
import Food from '../v2/Food';
import Snake from '../v2/Snake';

interface IGame {
  speedOfGame: number;
  setHeighestScore: (score: number) => void;
  showGameOverScreen: (activeStep: NGame.TSteps) => void;
  currentLevel: NGame.TLevels;
}

const Game: FC<IGame> = ({ speedOfGame, setHeighestScore, showGameOverScreen, currentLevel }) => {
  const intervalId = useRef<any>(null);
  const requestFrameId = useRef<any>(null);

  const [board, setBoard] = useState<NGame.IBoard>({
    snakeBody: INIT.snakePosition,
    food: INIT.foodPosition,
    direction: 'right',
    lastDirection: 'right',
    gameOver: false,
    points: 0,
    gameIsStopped: false,
  });

  useLayoutEffect(() => {
    setBoard((prev) => ({ ...prev, food: generatePosition() }));
  }, []);

  function updateFrame() {
    const snakeHead = board.snakeBody[0];
    const newSnakeBody = board.snakeBody;
    const newHead = { ...snakeHead };
    const { step } = INIT.move;

    switch (board.direction) {
      case 'up':
        newHead.y -= step;
        break;
      case 'down':
        newHead.y += step;
        break;
      case 'left':
        newHead.x -= step;
        break;
      case 'right':
        newHead.x += step;
        break;
      default:
        break;
    }

    reversePositionOnEdge(newHead);
    onEatingFood(snakeHead, newSnakeBody, newHead);
  }

  function onEatingFood(
    snakeHead: NGame.ICordinates,
    newSnakeBody: NGame.ICordinates[],
    newHead: NGame.ICordinates
  ) {
    if (snakeHead.x === board.food?.x && snakeHead.y === board.food.y) {
      newSnakeBody.push({ x: board.food.x, y: board.food.y });

      let newPositionFood = generatePosition();
      newPositionFood = checkPositionFoodAtSnake(newSnakeBody, newPositionFood);

      setBoard((prev) => ({
        ...prev,
        food: newPositionFood,
        snakeBody: newSnakeBody,
      }));

      updateScores(currentLevel);
    } else {
      setBoard((prev) => ({
        ...prev,
        snakeBody: [newHead, ...prev.snakeBody.slice(0, -1)],
      }));
    }
  }

  function reversePositionOnEdge(newHead: NGame.ICordinates) {
    const { top, left, right, bottom } = INIT.app.edge;

    if (newHead.x < left) newHead.x = right;
    if (newHead.x > right) newHead.x = left;
    if (newHead.y < top) newHead.y = bottom;
    if (newHead.y > bottom) newHead.y = top;
  }

  function saveLastDirection(direction: NGame.TDirection): void {
    if (direction != 'stop') {
      setBoard((prev) => ({ ...prev, lastDirection: direction }));
    }
  }

  function changeDirection(key: NGame.TDirection): void {
    let currentDirection: NGame.TDirection = board.direction;

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

  function generatePosition(): NGame.ICordinates {
    const { rows, columns } = INIT.app.board;
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);

    return {
      x: x === columns ? columns - 1 : x,
      y: y === rows ? rows - 1 : y,
    };
  }

  function checkPositionFoodAtSnake(
    snakeBody: NGame.ICordinates[],
    foodPosition: NGame.ICordinates
  ): NGame.ICordinates {
    let newFoodPosition = foodPosition;

    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeBody[i].x === newFoodPosition.x || snakeBody[i].y === newFoodPosition.y) {
        newFoodPosition = generatePosition();
      }
    }

    return newFoodPosition;
  }

  function updateScores(currentLevel: NGame.TLevels): void {
    const pointlAsIndex: keyof typeof NGame.PointRate = currentLevel;

    setBoard((prev) => ({
      ...prev,
      points: prev.points + NGame.PointRate[pointlAsIndex],
    }));
  }

  function checkCollision(): void {
    const { snakeBody } = board;
    let snakeHead = { ...snakeBody[snakeBody.length - 1] };

    for (let i = 1; i < snakeBody.length - 1; i++) {
      let isColision = snakeHead.x === snakeBody[i].x && snakeHead.y === snakeBody[i].y;
      if (isColision) {
        finishTheGame();
      }
    }
  }

  function finishTheGame(): void {
    setBoard((prev) => ({ ...prev, gameOver: true }));
  }

  function resumeGame(): void {
    setBoard((prev) => ({ ...prev, gameIsStopped: false }));
  }

  function clearingIntervalsGame() {
    clearInterval(intervalId.current);
    cancelAnimationFrame(requestFrameId.current);
  }

  function gameOver(): void {
    setHeighestScore(board.points);
    showGameOverScreen('gameOver');
    clearingIntervalsGame();
  }

  useEffect(() => {
    if (board.direction === 'stop') {
      setBoard((prev) => ({ ...prev, gameIsStopped: true }));
    }
  }, [board.direction]);

  useEffect(() => {
    if (!board.gameOver) {
      intervalId.current = setTimeout(() => {
        requestFrameId.current = requestAnimationFrame(updateFrame);
        checkCollision();
      }, speedOfGame);
    }

    if (board.direction === 'stop') {
      clearingIntervalsGame();
    }

    if (board.gameOver) {
      gameOver();
    }

    return () => {
      clearingIntervalsGame();
    };
  }, [board]);

  return (
    <View style={styles.gameContainer}>
      <GameScores result={board.points} />
      <GameBoard>
        <Snake snakeBody={board.snakeBody} />
        <Food food={board.food || { x: 0, y: 0 }} />
      </GameBoard>
      <GameControl
        changeDirection={changeDirection}
        currentDirection={board.direction}
        gameOver={gameOver}
      />

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
});

export default Game;
