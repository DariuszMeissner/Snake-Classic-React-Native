import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const INIT = {
  blockSize: 20,
  borderWidth: 1,
  height: {
    scores: 5,
    board: 55,
    control: 40,
  },
  maxWidth: 500,
  responsiveWidthMax: responsiveWidth(100) > 500 ? 500 : responsiveWidth(100),
  responsiveHeightMax: responsiveHeight(100),
  screenWidthMax: responsiveWidth(100),
};

export const SETTINGS_DEFAULT = {
  screenWidthMax: INIT.screenWidthMax,
  app: {
    width: INIT.responsiveWidthMax,
    height: INIT.responsiveHeightMax,
    content: {
      width:
        Math.floor(INIT.responsiveWidthMax / INIT.blockSize) * INIT.blockSize +
        2 * INIT.borderWidth -
        INIT.blockSize,
    },
  },
  colors: {
    main: '#384331',
    second: '#8fa37e',
  },
  fontName: 'PressStart2P-Regular',
  layout: {
    heightSection: {
      scores: responsiveHeight(INIT.height.scores),
      board: responsiveHeight(INIT.height.board),
      control: responsiveHeight(INIT.height.control),
    },
    board: {
      blockSize: INIT.blockSize,
      borderWidth: INIT.borderWidth,
      numberOfColumn: Math.floor(INIT.responsiveWidthMax / INIT.blockSize),
      numberOfRows: Math.floor(responsiveHeight(INIT.height.board) / INIT.blockSize),
      snakeStartPosition: { x: 0, y: 0 },
    },
  },
  snakeStartPosition: { x: 0, y: 0 },
};

export const CUSTOM_FONTS = {
  'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
};
