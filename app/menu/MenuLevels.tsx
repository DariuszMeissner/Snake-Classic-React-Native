import React, { FC } from 'react';
import { Layout, Space } from '../../components';
import { NGame } from '../../types/types';
import MenuButton from './MenuButton';

interface IMenuLevelsProps {
  currentLevel: NGame.TLevels;
  onPressSetLevel: (level: NGame.TLevels) => void;
  onPressGoToStep: (level: NGame.TSteps) => void;
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

      <Space />

      <MenuButton
        title={'<- go to menu'}
        onPress={() => onPressGoToStep('menu')}
        currentLevel={currentLevel}
      />
    </Layout>
  );
};

export default MenuLevels;
