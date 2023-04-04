import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameBoard, GameControl, GameScores, GameWarning } from '.';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';
import { NRoot } from '../root.interface';
import { NGame } from './game.interface';

interface IGame {
  speedOfGame: number;
  setHeighestScore: (score: number) => void;
  showGameOverScreen: (activeStep: NRoot.TSteps) => void;
  currentLevel: NRoot.TLevels;
}

const Game: FC<IGame> = ({ speedOfGame, setHeighestScore, showGameOverScreen, currentLevel }) => {
  const intervalRef = useRef<any>(null);
  const requestFrameRef = useRef<any>(null);
  const [board, setBoard] = useState<NGame.IBoard>({
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
    return board.rows
      ? board.rows.map((row, i) =>
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
        )
      : [[]];
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

  function updateFrame(): void {
    let newRows = generateRows();

    // set position snakebody
    board.snakeBody.forEach((el) => (newRows[el.x][el.y] = 'snakeBody'));

    // set position food
    if (board.food) {
      newRows[board.food.x][board.food.y] = 'food';
    }

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
    if (snakeHead.y < 0) snakeHead.y = numberOfColumn - 2;
    if (snakeHead.y >= numberOfColumn - 1) snakeHead.y = 0;

    newSnakeBody.push(snakeHead);
    newSnakeBody.shift();

    setBoard((prev) => ({ ...prev, snakeBody: newSnakeBody }));

    updateFrame();
  }

  function generatePosition(): NGame.ICordinates {
    const { numberOfRows, numberOfColumn } = SETTINGS_DEFAULT.layout.board;

    let postion = {
      x: Math.floor(Math.random() * numberOfRows),
      y: Math.floor(Math.random() * numberOfColumn),
    };

    return checkRangeNewPositionOfFood(postion);
  }

  function checkRangeNewPositionOfFood(position: NGame.ICordinates): NGame.ICordinates {
    const { numberOfRows, numberOfColumn } = SETTINGS_DEFAULT.layout.board;

    let x = position.x >= numberOfRows ? position.x - 1 : position.x;
    let y = position.y >= numberOfColumn - 1 ? position.y - 2 : position.y;

    return { x, y };
  }

  function checkPositionFoodAtSnakeReturnNew(
    snakeBody: NGame.ICordinates[],
    foodPosition: NGame.ICordinates
  ): NGame.ICordinates {
    let newFoodPosition = foodPosition;

    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeBody[i].x === newFoodPosition.x) {
        newFoodPosition.x = Math.floor(Math.random() * SETTINGS_DEFAULT.layout.board.numberOfRows);
      }

      if (snakeBody[i].y === newFoodPosition.y) {
        newFoodPosition.y = Math.floor(
          Math.random() * SETTINGS_DEFAULT.layout.board.numberOfColumn
        );
      }
    }

    return checkRangeNewPositionOfFood(newFoodPosition);
  }

  function onEatingFood(): void {
    if (board.food) {
      let newSnakeBody = board.snakeBody;
      let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };

      if (snakeHead.x === board.food.x && snakeHead.y === board.food.y) {
        let newPositionFood = generatePosition();
        newSnakeBody.push(snakeHead);

        updateScores(currentLevel);

        // check colision food with snake
        newPositionFood = checkPositionFoodAtSnakeReturnNew(newSnakeBody, newPositionFood);
        setPositionOfFoodAndSnake(newSnakeBody, newPositionFood);
      }
    }
  }

  function setPositionOfFoodAndSnake(
    snakeBody: NGame.ICordinates[],
    food: NGame.ICordinates
  ): void {
    setBoard((prev) => ({ ...prev, snakeBody, food }));
  }

  function updateScores(currentLevel: NRoot.TLevels): void {
    const pointlAsIndex: keyof typeof NRoot.PointRate = currentLevel;

    setBoard((prev) => ({
      ...prev,
      points: prev.points + NRoot.PointRate[pointlAsIndex],
    }));
  }

  function detectCollisionSnakeAtSnake(): void {
    const { snakeBody } = board;
    let snakeHead = { ...snakeBody[snakeBody.length - 1] };

    for (let i = 0; i < snakeBody.length - 3; i++) {
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

  function stopGame() {
    // cancelAnimationFrame(requestFrameRef.current);
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
      // intervalRef.current = setTimeout(() => {
      //   requestFrameRef.current = requestAnimationFrame(moveSnake);
      // }, speedOfGame);
      // onEatingFood();
      // detectCollisionSnakeAtSnake();
    }

    if (board.direction === 'stop') {
      stopGame();
    }

    if (board.gameOver) {
      // cancelAnimationFrame(requestFrameRef.current);
      clearInterval(intervalRef.current);
      gameOver();
    }

    return () => clearInterval(intervalRef.current);
  }, [board]);

  return (
    <View style={styles.gameContainer}>
      <GameScores result={board.points} />
      <GameBoard>{drawBoard()}</GameBoard>
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
