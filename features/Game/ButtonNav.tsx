import React, { FC } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

interface IButtonNavProps {
  title: string;
  handleMove: () => void;
}

const ButtonNav: FC<IButtonNavProps> = ({ title, handleMove }) => {
  return (
    <TouchableHighlight onPress={handleMove}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 85,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 25,
    textTransform: 'uppercase',
  },
});

export default ButtonNav;
