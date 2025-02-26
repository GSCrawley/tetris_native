// Game speed in milliseconds
export const GAME_SPEEDS = {
  NORMAL: 1000,
  FAST: 500,
  SUPER_FAST: 200
};

// Game states
export const GAME_STATES = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME_OVER'
};

// Swipe thresholds for touch controls (in pixels)
export const SWIPE_CONFIG = {
  DISTANCE_THRESHOLD: 30,  // Minimum distance for a swipe
  VELOCITY_THRESHOLD: 0.3, // Minimum velocity for a swipe
  DOUBLE_TAP_DELAY: 300   // Maximum delay between taps for double-tap
};

// Touch control actions
export const TOUCH_ACTIONS = {
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  SWIPE_DOWN: 'SWIPE_DOWN',
  TAP: 'TAP',
  DOUBLE_TAP: 'DOUBLE_TAP'
};

// Points scoring system
export const POINTS = {
  SINGLE: 40,
  DOUBLE: 100,
  TRIPLE: 300,
  TETRIS: 1200,
  SOFT_DROP: 1,
  HARD_DROP: 2
};

// Game dimensions (in logical pixels)
export const GAME_DIMENSIONS = {
  CELL_SIZE: 30,      // Size of each grid cell
  PREVIEW_SCALE: 0.7  // Scale factor for preview piece
};
