import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonNav } from '../features';

interface IBoard {
  rows: string[][];
  snakeBody: ICordinates[];
  food: ICordinates;
  direction: TDirection;
  speed: number;
  gameOver: boolean;
}

interface ICordinates {
  x: number;
  y: number;
}

type TDirection = 'left' | 'right' | 'up' | 'down' | 'stop';

const BOARD_INIT = {
  width: 6,
  height: 6,
  blockSize: 20,
  snakeStartPosition: { x: 0, y: 0 },
};

const Game: FC = () => {
  const [board, setBoard] = useState<IBoard>({
    rows: generateRows(),
    snakeBody: [BOARD_INIT.snakeStartPosition],
    food: generatePositionOfFood(),
    direction: 'stop',
    speed: 300,
    gameOver: false,
  });

  function generateRows(): string[][] {
    return [...Array(BOARD_INIT.width)].map((_) =>
      [...Array(BOARD_INIT.height)].map((_) => 'gridItem')
    );
  }

  function setColor(val: string): string {
    return val === 'snakeBody' || val === 'food' ? 'red' : '';
  }

  function drawBoard(): JSX.Element[][] {
    return board.rows.map((row, i) =>
      row.map((value, j) =>
        j === BOARD_INIT.width - 1 ? (
          <>
            <View
              key={i + j}
              nativeID={`${i}-${j}`}
              style={{ ...styles.gridItem, backgroundColor: setColor(value) }}
            />
            <View key={i + j * j} style={styles.gridBreak} />
          </>
        ) : (
          <View
            key={i + j}
            nativeID={`${i}-${j}`}
            style={{ ...styles.gridItem, backgroundColor: setColor(value) }}
          />
        )
      )
    );
  }

  function generatePositionOfFood(): ICordinates {
    return {
      x: Math.floor(Math.random() * BOARD_INIT.width),
      y: Math.floor(Math.random() * BOARD_INIT.height),
    };
  }

  function changeDirection(key: TDirection): void {
    let newDirection: TDirection = board.direction;

    if (key === 'left') newDirection = board.direction === 'right' ? 'right' : 'left';
    if (key === 'right') newDirection = board.direction === 'left' ? 'left' : 'right';
    if (key === 'up') newDirection = board.direction === 'down' ? 'down' : 'up';
    if (key === 'down') newDirection = board.direction === 'up' ? 'up' : 'down';

    setBoard((prev) => ({ ...prev, direction: newDirection }));
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

    const { width, height } = BOARD_INIT;
    let newSnakeBody = board.snakeBody;
    let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };

    if (board.direction === 'left') snakeHead.y += -1;
    if (board.direction === 'right') snakeHead.y += 1;
    if (board.direction === 'up') snakeHead.x += -1;
    if (board.direction === 'down') snakeHead.x += 1;

    if (snakeHead.x < 0) snakeHead.x = width - 1;
    if (snakeHead.x >= width) snakeHead.x = 0;
    if (snakeHead.y < 0) snakeHead.y = height - 1;
    if (snakeHead.y >= height) snakeHead.y = 0;

    newSnakeBody.push(snakeHead);
    newSnakeBody.shift();

    setBoard((prev) => ({ ...prev, snakeBody: newSnakeBody }));

    updateFrame();
  }

  function onEatingFood() {
    let newSnakeBody = board.snakeBody;
    let newPositionFood = generatePositionOfFood();
    let snakeHead = { ...newSnakeBody[newSnakeBody.length - 1] };
    const { food } = board;

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      newSnakeBody.push(snakeHead);

      for (let i = 0; i < newSnakeBody.length; i++) {
        if (newSnakeBody[i].x === newPositionFood.x) {
          newPositionFood.x = Math.floor(Math.random() * BOARD_INIT.width);
        }

        if (newSnakeBody[i].y === newPositionFood.y) {
          newPositionFood.y = Math.floor(Math.random() * BOARD_INIT.height);
        }
      }

      setBoard((prev) => ({ ...prev, snakeBody: newSnakeBody, food: newPositionFood }));
    }
  }

  function detectCollisionSnakeAtSnake() {
    const { snakeBody } = board;
    let snakeHead = { ...snakeBody[snakeBody.length - 1] };

    for (let i = 0; i < snakeBody.length - 3; i++) {
      if (snakeHead.x === snakeBody[i].x && snakeHead.y === snakeBody[i].y) {
        setBoard((prev) => ({ ...prev, gameOver: true }));
        alert('game over');
      }
    }
  }

  useEffect(() => {
    if (!board.gameOver) {
      onEatingFood();
      detectCollisionSnakeAtSnake();
    }
    const interval = setInterval(moveSnake, board.speed);

    if (board.gameOver) clearInterval(interval);

    return () => clearInterval(interval);
  }, [board]);

  return (
    <View style={styles.snakeContainer}>
      <View style={styles.grid}>{drawBoard()}</View>
      <View style={styles.buttonsContainer}>
        <ButtonNav title="up" handleMove={() => changeDirection('up')} />
        <ButtonNav title="down" handleMove={() => changeDirection('down')} />
        <ButtonNav title="left" handleMove={() => changeDirection('left')} />
        <ButtonNav title="right" handleMove={() => changeDirection('right')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  snakeContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridBreak: {
    flexBasis: '100%',
    height: 0,
  },
  grid: {
    position: 'relative',
    backgroundColor: 'gray',
    margin: 'auto',
    width: BOARD_INIT.width * BOARD_INIT.blockSize,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: BOARD_INIT.blockSize,
    height: BOARD_INIT.blockSize,
  },
  snakeBody: {
    position: 'relative',
    zIndex: 2,
    width: BOARD_INIT.blockSize,
    height: BOARD_INIT.blockSize,
  },
  food: {
    position: 'relative',
    zIndex: 1,
    width: BOARD_INIT.blockSize,
    height: BOARD_INIT.blockSize,
  },
});

export default Game;
