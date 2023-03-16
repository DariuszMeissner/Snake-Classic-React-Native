import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View, ViewStyle } from 'react-native';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IGameBoardProps {
  children: React.ReactNode;
}

const BLOCK_SIZE = SETTINGS_DEFAULT.layout.board.blockSize;
const BORDER_WIDTH = SETTINGS_DEFAULT.layout.board.borderWidth;

const GameBoard: FC<IGameBoardProps> = ({ children }) => {
  return <View style={styles.gameBoard}>{children}</View>;
};

const styles = StyleSheet.create({
  gameBoard: {
    width: Math.floor(SETTINGS_DEFAULT.layout.width / BLOCK_SIZE) * BLOCK_SIZE + 2 * BORDER_WIDTH,
    borderStyle: 'solid',
    borderColor: SETTINGS_DEFAULT.colors.main,
    borderWidth: SETTINGS_DEFAULT.layout.board.borderWidth,
    backgroundColor: SETTINGS_DEFAULT.colors.second,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default GameBoard;
