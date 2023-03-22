import React, { FC } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';
import { NRoot } from '../root.interface';

interface IMenuButtonProps {
  title: NRoot.TSteps | NRoot.TLevels | string;
  currentLevel?: NRoot.TLevels;
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
        <TextCustom style={{ color: isActive ? colors.second : colors.main }}>
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
