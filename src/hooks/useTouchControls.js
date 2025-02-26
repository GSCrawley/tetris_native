import { useCallback } from 'react';
import { SWIPE_CONFIG, TOUCH_ACTIONS } from '../utils/constants';

export const useTouchControls = (onAction) => {
  let lastTapTime = 0;

  const handleGesture = useCallback((event) => {
    const { translationX, translationY, velocityX, velocityY } = event;
    const now = Date.now();

    // Handle double tap
    if (
      Math.abs(translationX) < 10 && 
      Math.abs(translationY) < 10
    ) {
      if (now - lastTapTime < SWIPE_CONFIG.DOUBLE_TAP_DELAY) {
        onAction(TOUCH_ACTIONS.DOUBLE_TAP);
        lastTapTime = 0; // Reset to prevent triple-tap
      } else {
        onAction(TOUCH_ACTIONS.TAP);
        lastTapTime = now;
      }
      return;
    }

    // Handle swipes
    if (Math.abs(translationX) > SWIPE_CONFIG.DISTANCE_THRESHOLD) {
      if (Math.abs(velocityX) > SWIPE_CONFIG.VELOCITY_THRESHOLD) {
        if (translationX > 0) {
          onAction(TOUCH_ACTIONS.SWIPE_RIGHT);
        } else {
          onAction(TOUCH_ACTIONS.SWIPE_LEFT);
        }
      }
    }

    if (
      translationY > SWIPE_CONFIG.DISTANCE_THRESHOLD && 
      Math.abs(velocityY) > SWIPE_CONFIG.VELOCITY_THRESHOLD
    ) {
      onAction(TOUCH_ACTIONS.SWIPE_DOWN);
    }
  }, [onAction]);

  return handleGesture;
};
