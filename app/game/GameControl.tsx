import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { INIT } from '../../constant/settingsDefault';
import { NGame } from '../../types/types';
import GameButton from './GameButton';

interface IGameControlProps {
  isStopDirection: boolean;
  changeDirection?: (key: NGame.TDirection) => void;
  gameOver?: (activeStep: NGame.TSteps) => void;
}

const GameControl: FC<IGameControlProps> = ({
  isStopDirection,
  changeDirection = () => {},
  gameOver = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.gameControl}>
        <View>
          <GameButton title="up" onPress={() => changeDirection('up')} />
        </View>

        <View style={styles.row}>
          <GameButton title="left" onPress={() => changeDirection('left')} />

          <GameButton
            title={isStopDirection ? 'start' : 'stop'}
            onPress={() => changeDirection(isStopDirection ? 'start' : 'stop')}
          />
          <GameButton title="right" onPress={() => changeDirection('right')} />
        </View>

        <View>
          <GameButton title="down" onPress={() => changeDirection('down')} />
        </View>
      </View>

      <View style={styles.gameControlBottom}>
        <View style={styles.finishButton}>
          <GameButton title="finish" onPress={() => gameOver('gameOver')} invertColors />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: INIT.app.section.width,
    height: INIT.app.section.height.control,
  },
  gameControl: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameControlBottom: {
    width: INIT.app.section.width,
    borderTopColor: INIT.colors.main,
    borderTopWidth: INIT.borderWidth,
  },
  finishButton: {
    width: '33%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default memo(GameControl);
