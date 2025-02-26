// This will contain game logic utilities
// We'll port over the relevant functions from the web version

// Game constants
export const GRID_ROWS = 18;
export const GRID_COLS = 10;

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns the default grid
export const gridDefault = () => {
  const array = [];
  
  for (let row = 0; row < GRID_ROWS; row++) {
    array.push([]);
    for (let col = 0; col < GRID_COLS; col++) {
      array[row].push(0);
    }
  }
  return array;
};

// Define block shapes and their rotations as arrays.
export const shapes = [
  // none
  [[[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]]],

  // I
  [[[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]]],

  // T
  [[[0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // L
  [[[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],

   [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]],

  // J
  [[[1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]]],

  // Z
  [[[0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // S
  [[[0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]]],

  // O
  [[[0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]]]
];

// Define colors for each shape
export const COLORS = {
  0: 'transparent',  // Empty cell
  1: '#FF0D72',     // I
  2: '#0DC2FF',     // T
  3: '#0DFF72',     // L
  4: '#F538FF',     // J
  5: '#FF8E0D',     // Z
  6: '#FFE138',     // S
  7: '#3877FF'      // O
};

// Returns the next rotation for a shape
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length;
};

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation];
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x;
        const proposedY = row + y;
        if (proposedY < 0) {
          continue;
        }
        const possibleRow = grid[proposedY];
        if (possibleRow) {
          if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

// Return a random shape
export const randomShape = () => {
  return random(1, shapes.length - 1);
};

// Add block to grid
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  const block = shapes[shape][rotation];
  const newGrid = [...grid];
  let landed = false;

  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y;
        if (yIndex < 0) {
          continue;
        }
        if (yIndex >= 0) {
          newGrid[row + y][col + x] = shape;
          landed = true;
        }
      }
    }
  }
  return { newGrid, landed };
};

// Check for completed rows
export const checkRows = (grid) => {
  const points = [0, 40, 100, 300, 1200];
  let completedRows = [];
  
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].every(cell => cell > 0)) {
      completedRows.push(row);
    }
  }

  if (completedRows.length > 0) {
    const newGrid = grid.map(row => [...row]);
    completedRows.forEach(row => {
      newGrid.splice(row, 1);
      newGrid.unshift(Array(GRID_COLS).fill(0));
    });
    return {
      newGrid,
      clearedLines: completedRows.length,
      score: points[completedRows.length],
      completedRows
    };
  }

  return {
    newGrid: grid,
    clearedLines: 0,
    score: 0,
    completedRows: []
  };
};

// Default game state
export const defaultState = () => {
  return {
    grid: gridDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 4,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    speed: 1000,
    gameOver: false,
    completedRows: [],
  };
};
