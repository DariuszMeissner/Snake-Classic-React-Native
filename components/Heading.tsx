import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface IParagraphProps {
  children: React.ReactNode;
}

const Heading: FC<IParagraphProps> = ({ children }) => {
  return <Text style={styles.paragraph}>{children}</Text>;
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Heading;
