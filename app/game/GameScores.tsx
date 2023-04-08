import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextCustom } from '../../components';
import { INIT } from '../../constant/settingsDefault';

interface IGameScoresProps {
  result: number;
}

const GameScores: FC<IGameScoresProps> = ({ result }) => {
  return (
    <View style={styles.gameScores}>
      <TextCustom size={'14'}>{result || 0}</TextCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  gameScores: {
    height: INIT.app.section.height.scores,
    width: INIT.app.section.width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default memo(GameScores);
