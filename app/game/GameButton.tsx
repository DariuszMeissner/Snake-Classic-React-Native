import React, { FC } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IButtonNavProps {
  title: string;
  onPress: () => void;
  invertColors?: boolean;
}

const GameButton: FC<IButtonNavProps> = ({ title, onPress, invertColors = false }) => {
  const { colors } = SETTINGS_DEFAULT;

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{ ...styles.button, backgroundColor: invertColors ? colors.second : colors.main }}
      >
        <TextCustom
          size={14}
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
    height: SETTINGS_DEFAULT.layout.heightSection.control / 4,
    width: SETTINGS_DEFAULT.app.content.width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default GameButton;
