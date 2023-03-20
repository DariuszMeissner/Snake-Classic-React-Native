import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IGameScoresProps {
  result: number;
}

const GameScores: FC<IGameScoresProps> = ({ result }) => {
  return (
    <View style={styles.gameScores}>
      <TextCustom size={14}>{result || 0}</TextCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  gameScores: {
    height: SETTINGS_DEFAULT.layout.heightSection.scores,
    width: SETTINGS_DEFAULT.app.content.width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default GameScores;
