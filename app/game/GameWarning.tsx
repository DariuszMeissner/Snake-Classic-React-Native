import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Layout, TextCustom } from '../../components';

const GameWarning = () => {
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const timeOfBlinking = 500;

  const animationStyles: ViewStyle = {
    display: showWarning ? 'flex' : 'none',
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowWarning((prev) => !prev);
    }, timeOfBlinking);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout style={{ ...styles.gameWarning, ...animationStyles }}>
      <TextCustom size={14}>game is stopped</TextCustom>
    </Layout>
  );
};

const styles = StyleSheet.create({
  gameWarning: {
    position: 'absolute',
    height: 'auto',
  },
});
export default GameWarning;
