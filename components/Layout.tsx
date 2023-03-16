import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SETTINGS_DEFAULT } from '../constant/settingsDefault';

interface ILayoutProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SETTINGS_DEFAULT.layout.width,
    height: SETTINGS_DEFAULT.layout.height,
    maxWidth: SETTINGS_DEFAULT.layout.maxWidth,
  },
});

export default Layout;
