import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { INIT } from '../../constant/settingsDefault';

interface IGameBoardProps {
  children: React.ReactNode;
}

const GameBoard: FC<IGameBoardProps> = ({ children }) => {
  return <View style={styles.gameBoard}>{children}</View>;
};

const styles = StyleSheet.create({
  gameBoard: {
    width: INIT.app.section.width,
    height: INIT.app.section.height.board,
    borderStyle: 'solid',
    borderColor: INIT.colors.main,
    borderWidth: INIT.borderWidth,
    backgroundColor: INIT.colors.second,
  },
});

export default GameBoard;
