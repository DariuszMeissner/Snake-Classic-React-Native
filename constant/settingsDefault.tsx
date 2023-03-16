import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const SETTINGS_DEFAULT = {
  colors: {
    main: '#384331',
    second: '#8fa37e',
  },
  layout: {
    heightSection: {
      scores: responsiveHeight(5),
      board: responsiveHeight(70),
      control: responsiveHeight(25),
    },
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    board: {
      blockSize: 20,
      borderWidth: 1,
    },
    maxWidth: 500,
  },
};

export const CUSTOM_FONTS = {
  'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  name: 'PressStart2P-Regular',
};
