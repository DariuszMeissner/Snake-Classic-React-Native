import React, { FC } from 'react';
import { View } from 'react-native';
import { MenuButton } from '.';
import { Layout } from '../../components';
import { root } from '../root.interface';

interface IMenuProps {
  onPress: (step: root.TSteps) => void;
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
