import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { INIT } from '../constant/settingsDefault';

interface ISpaceProps {
  value?: 20 | 50;
}

const Space: FC<ISpaceProps> = ({ value }) => {
  return <View style={[styles.space, { height: value || 50 }]} />;
};

const styles = StyleSheet.create({
  space: {
    width: INIT.app.section.width,
  },
});

export default Space;
