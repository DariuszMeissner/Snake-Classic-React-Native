import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { INIT } from '../../constant/settingsDefault';
import { NGame } from '../../types/types';

interface ISnakeProps {
  snakeBody: NGame.ICordinates[];
}

const Snake: FC<ISnakeProps> = ({ snakeBody }) => {
  function drawSnake(): JSX.Element[] {
    return snakeBody.map((cordinates: any, index: number) => {
      const positionOfSnake = {
        left: cordinates.x * INIT.blockSize,
        top: cordinates.y * INIT.blockSize,
      };

      return <View key={index} style={[styles.snake, positionOfSnake]} />;
    });
  }

  return <>{drawSnake()}</>;
};

const styles = StyleSheet.create({
  snake: {
    width: INIT.blockSize,
    height: INIT.blockSize,
    backgroundColor: INIT.colors.main,
    position: 'absolute',
  },
});

export default Snake;
