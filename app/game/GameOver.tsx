import React, { FC, useEffect } from 'react';
import { Layout, TextCustom } from '../../components';
import { root } from '../root.interface';

interface IGameOverProps {
  goToMenu: (activeStep: root.TSteps) => void;
}

const GameOver: FC<IGameOverProps> = ({ goToMenu }) => {
  useEffect(() => {
    const intervalId = setTimeout(() => goToMenu('menu'), 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <TextCustom size={18}>Game Over</TextCustom>
    </Layout>
  );
};

export default GameOver;
