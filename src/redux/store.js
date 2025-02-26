import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

// We'll add reducers here later
const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
});

export default store;
