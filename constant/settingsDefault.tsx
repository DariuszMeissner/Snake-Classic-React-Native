import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const BLOCK_SIZE = 20;
const BORDER_WIDTH = 1;
const HEIGHT = {
  scores: 5,
  board: 60,
  control: 35,
};

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
      scores: responsiveHeight(HEIGHT.scores),
      board: responsiveHeight(HEIGHT.board),
      control: responsiveHeight(HEIGHT.control),
    },
    board: {
      blockSize: BLOCK_SIZE,
      borderWidth: BORDER_WIDTH,
      numberOfColumn: Math.floor(responsiveWidth(100) / BLOCK_SIZE),
      numberOfRows: Math.floor(responsiveHeight(HEIGHT.board) / BLOCK_SIZE),
      snakeStartPosition: { x: 0, y: 0 },
    },
    maxWidth: 500,
  },
  snakeStartPosition: { x: 0, y: 0 },
};

export const CUSTOM_FONTS = {
  'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
};
