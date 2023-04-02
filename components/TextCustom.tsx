import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { SETTINGS_DEFAULT } from '../constant/settingsDefault';

type TSize = 14 | 16 | 18 | 20 | undefined;

interface ITextCustom {
  size?: TSize;
  style?: TextStyle;
  children: React.ReactNode;
}

const DEFAULT_SIZE: TSize = 20;

const TextCustom: FC<ITextCustom> = ({ children, style, size }) => {
  return (
    <Text
      style={{
        ...styles.default,
        ...style,
        fontSize: size || DEFAULT_SIZE,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: SETTINGS_DEFAULT.fontName,
    color: SETTINGS_DEFAULT.colors.main,
    textTransform: 'uppercase',
  },
});

export default TextCustom;
