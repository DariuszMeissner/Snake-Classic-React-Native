import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const BLOCK_SIZE = 20;
const BORDER_WIDTH = 1;
const COMPENSATION_BLOCKSIZE = {
  columns: 2,
  rows: 1,
};
const SECTION_WIDTH =
  Math.floor(responsiveWidth(100) / BLOCK_SIZE) * BLOCK_SIZE + BORDER_WIDTH - BLOCK_SIZE;
const COLUMNS = Math.floor(responsiveWidth(100) / BLOCK_SIZE) - COMPENSATION_BLOCKSIZE.columns;
const ROWS = Math.floor(responsiveHeight(55) / BLOCK_SIZE) - COMPENSATION_BLOCKSIZE.rows;

export const INIT = {
  blockSize: BLOCK_SIZE,
  borderWidth: BORDER_WIDTH,
  snakePosition: [{ x: 0, y: 0 }],
  foodPosition: { x: 0, y: 0 },
  move: {
    step: 1,
  },
  colors: {
    main: '#384331',
    second: '#8fa37e',
  },
  fontName: 'PressStart2P-Regular',
  app: {
    maxWidth: responsiveWidth(100),
    maxHeight: responsiveHeight(100),
    section: {
      height: {
        scores: responsiveHeight(5),
        board: Math.floor(responsiveHeight(55) / BLOCK_SIZE) * BLOCK_SIZE + BORDER_WIDTH,
        control: responsiveHeight(40),
      },
      width: SECTION_WIDTH,
    },
    board: {
      columns: COLUMNS,
      rows: ROWS,
    },
    edge: {
      top: 0,
      right: COLUMNS,
      left: 0,
      bottom: ROWS,
    },
  },
};

export const CUSTOM_FONTS = {
  'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
};
