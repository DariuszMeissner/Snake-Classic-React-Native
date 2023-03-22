import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IGameBoardProps {
  children: React.ReactNode;
}

const GameBoard: FC<IGameBoardProps> = ({ children }) => {
  return <View style={styles.gameBoard}>{children}</View>;
};

const styles = StyleSheet.create({
  gameBoard: {
    width: SETTINGS_DEFAULT.app.content.width,
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
