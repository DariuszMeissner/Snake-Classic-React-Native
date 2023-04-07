import React, { FC } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { TextCustom } from '../../components';
import { INIT } from '../../constant/settingsDefault';

interface IButtonNavProps {
  title: string;
  onPress: () => void;
  invertColors?: boolean;
}

const NUMBER_OF_ROW = 4;
const NUMBER_OF_COL = 3;

const GameButton: FC<IButtonNavProps> = ({ title, onPress, invertColors = false }) => {
  const { colors } = INIT;

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{ ...styles.button, backgroundColor: invertColors ? colors.second : colors.main }}
      >
        <TextCustom
          size={'14'}
          style={{ ...styles.buttonText, color: invertColors ? colors.main : colors.second }}
        >
          {title}
        </TextCustom>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    height: INIT.app.section.height.control / NUMBER_OF_ROW,
    width: Math.floor(INIT.app.section.width / NUMBER_OF_COL),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default GameButton;
