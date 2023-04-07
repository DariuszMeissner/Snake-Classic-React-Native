import React, { FC } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { TextCustom } from '../../components';
import { INIT } from '../../constant/settingsDefault';
import { NGame } from '../../types/types';

interface IMenuButtonProps {
  title: NGame.TSteps | NGame.TLevels | string;
  currentLevel?: NGame.TLevels;
  onPress: () => void;
}

const MenuButton: FC<IMenuButtonProps> = ({ title, onPress, currentLevel }) => {
  const isActive = title === currentLevel;
  const { colors } = INIT;

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{
          ...styles.menuButton,
          backgroundColor: isActive ? colors.main : colors.second,
        }}
      >
        <TextCustom style={{ color: isActive ? colors.second : colors.main }}>
          {title === 'veryHeight' ? 'very height' : title}
        </TextCustom>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  menuButton: { padding: 20 },
});

export default MenuButton;
