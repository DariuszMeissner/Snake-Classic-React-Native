import React, { FC, useEffect } from 'react';
import { Layout, Space, TextCustom } from '../../components';
import { root } from '../root.interface';

interface IGameOverProps {
  goToMenu: (activeStep: root.TSteps) => void;
  currentResult: number;
}

const GameOver: FC<IGameOverProps> = ({ goToMenu, currentResult }) => {
  useEffect(() => {
    const intervalId = setTimeout(() => goToMenu('menu'), 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <TextCustom>Game Over</TextCustom>
      <Space value={20} />
      <TextCustom size={14}>Your result:&nbsp;{currentResult}</TextCustom>
    </Layout>
  );
};

export default GameOver;
