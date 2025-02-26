import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { GAME_STATES } from '../utils/constants';

// This will contain the game loop logic
export const useGameLoop = (
  gameState,
  speed,
  onTick
) => {
  const frameId = useRef(null);
  const lastTime = useRef(0);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState !== 'active' && gameState === GAME_STATES.PLAYING) {
        // Auto-pause when app goes to background
        // You should implement this pause functionality in your game state
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [gameState]);

  useEffect(() => {
    const gameLoop = (timestamp) => {
      if (!lastTime.current) lastTime.current = timestamp;

      const deltaTime = timestamp - lastTime.current;

      if (deltaTime > speed && gameState === GAME_STATES.PLAYING) {
        onTick();
        lastTime.current = timestamp;
      }

      frameId.current = requestAnimationFrame(gameLoop);
    };

    if (gameState === GAME_STATES.PLAYING) {
      frameId.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [gameState, speed, onTick]);
};
