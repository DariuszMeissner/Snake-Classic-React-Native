import { Dimensions } from 'react-native';

function getTablet() {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;

  return aspectRatio <= 1.6;
}

export const isTablet = getTablet(); // Assumes 4:3 aspect ratio for tablets
