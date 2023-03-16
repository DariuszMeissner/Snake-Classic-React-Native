import React, { FC } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

interface IButtonNavProps {
  title: string;
  handleMove: () => void;
}

const GameButton: FC<IButtonNavProps> = ({ title, handleMove }) => {
  return (
    <TouchableHighlight onPress={handleMove}>
      <View style={styles.button}>
        <TextCustom style={{ ...styles.buttonText }}>{title}</TextCustom>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    height: SETTINGS_DEFAULT.layout.heightSection.control / 3,
    width: SETTINGS_DEFAULT.layout.width / 3,
    backgroundColor: SETTINGS_DEFAULT.colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: SETTINGS_DEFAULT.colors.second,
  },
});

export default GameButton;
