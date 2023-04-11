import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { INIT } from '../constant/settingsDefault';

interface ILayoutProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: INIT.app.maxHeight,
  },
});

export default Layout;
