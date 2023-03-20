import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';
import { GameSettings } from './game.interface';
import GameButton from './GameButton';

interface IGameControlProps {
  currentDirection: GameSettings.TDirection;
  changeDirection: (key: GameSettings.TDirection) => void;
}

const GameControl: FC<IGameControlProps> = ({ changeDirection, currentDirection }) => {
  const isStart = currentDirection != 'stop';
  return (
    <View style={styles.gameControl}>
      <View>
        <GameButton title="up" handleMove={() => changeDirection('up')} />
      </View>

      <View style={styles.row}>
        <GameButton title="left" handleMove={() => changeDirection('left')} />
        <GameButton
          title={isStart ? 'stop' : 'start'}
          handleMove={() => changeDirection(isStart ? 'stop' : 'start')}
        />
        <GameButton title="right" handleMove={() => changeDirection('right')} />
      </View>

      <View>
        <GameButton title="down" handleMove={() => changeDirection('down')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameControl: {
    width: SETTINGS_DEFAULT.app.content.width,
    height: SETTINGS_DEFAULT.layout.heightSection.control,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GameControl;
