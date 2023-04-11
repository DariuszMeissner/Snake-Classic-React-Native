import React, { FC } from 'react';
import { View } from 'react-native';
import { MenuButton } from '.';
import { Layout } from '../../components';
import { NGame } from '../../types/types';

interface IMenuProps {
  onPress: (step: NGame.TSteps) => void;
}

const Menu: FC<IMenuProps> = ({ onPress }) => {
  return (
    <Layout>
      <MenuButton title={'new game'} onPress={() => onPress('new game')} />
      <MenuButton title={'levels'} onPress={() => onPress('levels')} />
      <MenuButton title={'highest score'} onPress={() => onPress('highest score')} />
    </Layout>
  );
};

export default Menu;
