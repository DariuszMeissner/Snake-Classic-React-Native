import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Layout, TextCustom } from '../../components';
import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

const GameWarning = () => {
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const timeOfBlinking = 500;

  const animationStyles: ViewStyle = {
    display: showWarning ? 'flex' : 'none',
  };

  useEffect(() => {
    const blinkingWarning = setInterval(() => {
      setShowWarning((prev) => !prev);
    }, timeOfBlinking);

    return () => clearInterval(blinkingWarning);
  }, []);

  return (
    <Layout style={{ ...styles.gameWarning, ...animationStyles }}>
      <TextCustom size={18}>game is stopped</TextCustom>
    </Layout>
  );
};

const styles = StyleSheet.create({
  gameWarning: {
    position: 'absolute',
    top:
      (SETTINGS_DEFAULT.layout.heightSection.board + SETTINGS_DEFAULT.layout.heightSection.scores) /
      2,
  },
});
export default GameWarning;
