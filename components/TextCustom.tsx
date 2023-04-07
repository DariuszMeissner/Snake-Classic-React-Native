import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { INIT } from '../constant/settingsDefault';
import { NGame } from '../types/types';

interface ITextCustom {
  size?: NGame.TSize;
  style?: TextStyle;
  children: React.ReactNode;
}

const DEFAULT_SIZE: NGame.TSize = '20';

const TextCustom: FC<ITextCustom> = ({ children, style, size }) => {
  return (
    <Text
      style={{
        ...styles.default,
        ...style,
        fontSize: Number(size) || Number(DEFAULT_SIZE),
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: INIT.fontName,
    color: INIT.colors.main,
    textTransform: 'uppercase',
  },
});

export default TextCustom;
