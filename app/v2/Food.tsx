import React, { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INIT } from '../../constant/settingsDefault';
import { NGame } from '../../types/types';

interface IFoodProps {
  food: NGame.ICordinates;
}

const Food: FC<IFoodProps> = ({ food }) => {
  const positionOfFood = {
    left: food.x * INIT.blockSize,
    top: food.y * INIT.blockSize,
  };

  return (
    <View style={[styles.food, positionOfFood]}>
      <Text />
    </View>
  );
};

const styles = StyleSheet.create({
  food: {
    position: 'absolute',
    width: INIT.blockSize,
    height: INIT.blockSize,
    backgroundColor: INIT.colors.main,
  },
});

export default memo(Food);
