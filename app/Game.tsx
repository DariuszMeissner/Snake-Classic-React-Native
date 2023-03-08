import React, { FC, useEffect, useRef } from 'react';
import Canvas from 'react-native-canvas';

const Game: FC = () => {
  const canvasRef = useRef<Canvas | null>(null);

  const gameArea = {
    context: canvasRef?.current?.getContext('2d'),
  };

  useEffect(() => {
    drawSquare();
  }, [canvasRef]);

  function drawSquare() {
    let ctx = gameArea.context;

    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 100, 100);
    }
  }

  return (
    <Canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: '#b6b696' }} />
  );
};

export default Game;
