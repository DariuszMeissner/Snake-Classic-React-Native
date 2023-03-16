import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IGameScoresProps {
  result: number;
}

const GameScores: FC<IGameScoresProps> = ({ result }) => {
  const widthWindow = SETTINGS_DEFAULT.layout.width;
  const blockSize = SETTINGS_DEFAULT.layout.board.blockSize;

  const paddingCompensation = (widthWindow - Math.floor(widthWindow / blockSize) * blockSize) / 2;

  return (
    <View style={{ ...styles.gameScores, padding: paddingCompensation }}>
      <TextCustom>{result || 0}</TextCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  gameScores: {
    height: SETTINGS_DEFAULT.layout.heightSection.scores,
    width: Math.floor(SETTINGS_DEFAULT.layout.width),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default GameScores;
