import React, { FC } from 'react';
import { View } from 'react-native';
import { SETTINGS_DEFAULT } from '../constant/settingsDefault';

interface ISpaceProps {
  value?: 20 | 50 | undefined;
}

const Space: FC<ISpaceProps> = ({ value }) => {
  return <View style={{ width: SETTINGS_DEFAULT.app.width, height: value || 50 }} />;
};

export default Space;
