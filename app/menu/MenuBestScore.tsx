import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Space, TextCustom } from '../../components';
import { NRoot } from '../root.interface';
import MenuButton from './MenuButton';

interface IMenuBestScore {
  bestResult: number;
  onPress: (step: NRoot.TSteps) => void;
}

const MenuBestScore: FC<IMenuBestScore> = ({ onPress, bestResult }) => {
  return (
    <Layout>
      <TextCustom style={styles.header}>Best result</TextCustom>

      <TextCustom>{bestResult}</TextCustom>

      <Space />
      <MenuButton title={'<- go to menu'} onPress={() => onPress('menu')} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
  },
});

export default MenuBestScore;
