import React, { FC } from 'react';
import { Layout } from '../../components';
import { root } from '../root.interface';
import MenuButton from './MenuButton';

interface IMenuLevelsProps {
  currentLevel: root.TLevels;
  onPress: (level: root.TLevels) => void;
}

const MenuLevels: FC<IMenuLevelsProps> = ({ onPress, currentLevel }) => {
  return (
    <Layout>
      <MenuButton
        title={'veryHeight'}
        onPress={() => onPress('veryHeight')}
        currentLevel={currentLevel}
      />
      <MenuButton title={'height'} onPress={() => onPress('height')} currentLevel={currentLevel} />
      <MenuButton title={'medium'} onPress={() => onPress('medium')} currentLevel={currentLevel} />
      <MenuButton title={'easy'} onPress={() => onPress('easy')} currentLevel={currentLevel} />
    </Layout>
  );
};

export default MenuLevels;
