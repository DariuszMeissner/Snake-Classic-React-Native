import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { CUSTOM_FONTS, SETTINGS_DEFAULT } from '../constant/settingsDefault';

interface ITextCustom {
  size?: 14 | 16 | 18 | undefined;
  style?: TextStyle;
  children: React.ReactNode;
}

const TextCustom: FC<ITextCustom> = ({ children, style, size }) => {
  return (
    <Text
      style={{
        ...styles.default,
        ...style,
        fontSize: size || 14,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: CUSTOM_FONTS.name,
    color: SETTINGS_DEFAULT.colors.main,
    textTransform: 'uppercase',
    lineHeight: 20,
  },
});

export default TextCustom;
