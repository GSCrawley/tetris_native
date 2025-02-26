import { createSlice } from '@reduxjs/toolkit';
import { 
  defaultState,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  nextRotation,
  randomShape
} from '../../utils';
import { GAME_STATES, GAME_SPEEDS } from '../../utils/constants';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    ...defaultState(),
    gameState: GAME_STATES.PLAYING,
    speed: GAME_SPEEDS.NORMAL,
  },
  reducers: {
    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        state.x = x - 1;
      }
    },
    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        state.x = x + 1;
      }
    },
    moveDown: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x, y + 1, rotation)) {
        state.y = y + 1;
      } else {
        const { newGrid, landed } = addBlockToGrid(shape, grid, x, y, rotation);
        if (landed) {
          state.grid = newGrid;
          const { newGrid: clearedGrid, score, completedRows } = checkRows(newGrid);
          
          if (score) {
            state.score += score;
            state.grid = clearedGrid;
            state.completedRows = completedRows;
          }

          state.shape = state.nextShape;
          state.nextShape = randomShape();
          state.rotation = 0;
          state.x = 4;
          state.y = -4;

          if (!canMoveTo(state.shape, state.grid, state.x, state.y, state.rotation)) {
            state.gameState = GAME_STATES.GAME_OVER;
          }
        }
      }
    },
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }
    },
    hardDrop: (state) => {
      const { shape, grid, x, y, rotation } = state;
      let dropDistance = 0;
      while (canMoveTo(shape, grid, x, y + dropDistance + 1, rotation)) {
        dropDistance += 1;
      }
      state.y = y + dropDistance;
      // Force a landing
      const { newGrid, landed } = addBlockToGrid(shape, grid, x, state.y, rotation);
      if (landed) {
        state.grid = newGrid;
        const { newGrid: clearedGrid, score, completedRows } = checkRows(newGrid);
        
        if (score) {
          state.score += score;
          state.grid = clearedGrid;
          state.completedRows = completedRows;
        }

        state.shape = state.nextShape;
        state.nextShape = randomShape();
        state.rotation = 0;
        state.x = 4;
        state.y = -4;

        if (!canMoveTo(state.shape, state.grid, state.x, state.y, state.rotation)) {
          state.gameState = GAME_STATES.GAME_OVER;
        }
      }
    },
    pauseGame: (state) => {
      if (state.gameState === GAME_STATES.PLAYING) {
        state.gameState = GAME_STATES.PAUSED;
      } else if (state.gameState === GAME_STATES.PAUSED) {
        state.gameState = GAME_STATES.PLAYING;
      }
    },
    resetGame: () => {
      return {
        ...defaultState(),
        gameState: GAME_STATES.PLAYING,
        speed: GAME_SPEEDS.NORMAL,
      };
    },
    clearCompletedRows: (state) => {
      state.completedRows = [];
    }
  }
});

export const { 
  moveLeft, 
  moveRight, 
  moveDown, 
  rotate, 
  hardDrop,
  pauseGame,
  resetGame,
  clearCompletedRows
} = gameSlice.actions;

export default gameSlice.reducer;
