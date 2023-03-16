import { SETTINGS_DEFAULT } from '../../constant/settingsDefault';

export const BLOCK_SIZE = SETTINGS_DEFAULT.layout.board.blockSize;

export const INIT_SETTINGS = {
  board: {
    width: Math.floor(SETTINGS_DEFAULT.layout.width / BLOCK_SIZE),
    height: Math.floor(SETTINGS_DEFAULT.layout.heightSection.board / BLOCK_SIZE),
    snakeStartPosition: { x: 0, y: 0 },
  },
};
