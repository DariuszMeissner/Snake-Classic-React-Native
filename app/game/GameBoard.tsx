import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IGameBoardProps {
  boardRows: string[][];
}

const GameBoard: FC<IGameBoardProps> = ({ boardRows }) => {
  function setColorOfBoardElements(val: string): string {
    return val === 'snakeBody' || val === 'food'
      ? SETTINGS_DEFAULT.colors.main
      : SETTINGS_DEFAULT.colors.second;
  }

  function generateBoard(): JSX.Element[][] {
    let rows: JSX.Element[][] = [[]];

    if (rows) {
      rows = boardRows.map((row, i) =>
        row.map((value, j) =>
          j === SETTINGS_DEFAULT.layout.board.numberOfColumn - 1 ? (
            <View key={`${i * j}`} style={styles.gridBreak} />
          ) : (
            <View
              key={`${i}-${j}`}
              style={{ ...styles.gridItem, backgroundColor: setColorOfBoardElements(value) }}
            />
          )
        )
      );
    }

    return rows;
  }

  return <View style={styles.gameBoard}>{generateBoard()}</View>;
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
  gridBreak: {
    flexBasis: '100%',
    height: 0,
  },
  gridItem: {
    width: SETTINGS_DEFAULT.layout.board.blockSize,
    height: SETTINGS_DEFAULT.layout.board.blockSize,
  },
});

export default GameBoard;
