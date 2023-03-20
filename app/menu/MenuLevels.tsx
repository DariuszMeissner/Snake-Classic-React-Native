import React, { FC } from 'react';
import { Layout } from '../../components';
import { root } from '../root.interface';
import MenuButton from './MenuButton';

interface IMenuLevelsProps {
  currentLevel: root.TLevels;
  onPressSetLevel: (level: root.TLevels) => void;
  onPressGoToStep: (level: root.TSteps) => void;
}

const MenuLevels: FC<IMenuLevelsProps> = ({ onPressSetLevel, onPressGoToStep, currentLevel }) => {
  return (
    <Layout>
      <MenuButton
        title={'veryHeight'}
        onPress={() => onPressSetLevel('veryHeight')}
        currentLevel={currentLevel}
      />
      <MenuButton
        title={'height'}
        onPress={() => onPressSetLevel('height')}
        currentLevel={currentLevel}
      />
      <MenuButton
        title={'medium'}
        onPress={() => onPressSetLevel('medium')}
        currentLevel={currentLevel}
      />
      <MenuButton
        title={'easy'}
        onPress={() => onPressSetLevel('easy')}
        currentLevel={currentLevel}
      />

      <MenuButton
        title={'<- go to menu'}
        onPress={() => onPressGoToStep('menu')}
        currentLevel={currentLevel}
        marginTop={50}
      />
    </Layout>
  );
};

export default MenuLevels;
