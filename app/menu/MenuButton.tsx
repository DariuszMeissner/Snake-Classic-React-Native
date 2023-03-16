import React, { FC } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';
import { root } from '../root.interface';

interface IMenuButtonProps {
  title: root.TSteps | root.TLevels;
  currentLevel?: root.TLevels;
  onPress: () => void;
}

const MenuButton: FC<IMenuButtonProps> = ({ title, onPress, currentLevel }) => {
  const isActive = title === currentLevel;
  const { colors } = SETTINGS_DEFAULT;

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{
          ...styles.menuButton,
          backgroundColor: isActive ? colors.main : colors.second,
        }}
      >
        <TextCustom size={18} style={{ color: isActive ? colors.second : colors.main }}>
          {title === 'veryHeight' ? 'very height' : title}
        </TextCustom>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  menuButton: { padding: 16 },
});

export default MenuButton;
