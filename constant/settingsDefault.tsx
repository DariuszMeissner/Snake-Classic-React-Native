import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const BLOCK_SIZE = 20;
const BORDER_WIDTH = 1;

export const SETTINGS_DEFAULT = {
  app: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    content: {
      width:
        Math.floor(responsiveWidth(100) / BLOCK_SIZE) * BLOCK_SIZE + 2 * BORDER_WIDTH - BLOCK_SIZE,
      height: {},
    },
  },
  colors: {
    main: '#384331',
    second: '#8fa37e',
  },
  fontName: 'PressStart2P-Regular',
  layout: {
    heightSection: {
      scores: responsiveHeight(5),
      board: responsiveHeight(70),
      control: responsiveHeight(25),
    },
    board: {
      blockSize: BLOCK_SIZE,
      borderWidth: BORDER_WIDTH,
      numberOfColumn: Math.floor(responsiveWidth(100) / BLOCK_SIZE),
      numberOfRows: Math.floor(responsiveHeight(70) / BLOCK_SIZE),
      snakeStartPosition: { x: 0, y: 0 },
    },
    maxWidth: 500,
  },
  snakeStartPosition: { x: 0, y: 0 },
};

export const CUSTOM_FONTS = {
  'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
};
