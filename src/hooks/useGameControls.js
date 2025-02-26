import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TOUCH_ACTIONS } from '../utils/constants';
import {
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  hardDrop,
  pauseGame
} from '../redux/slices/gameSlice';

export const useGameControls = () => {
  const dispatch = useDispatch();

  const handleTouchAction = useCallback((action) => {
    switch (action) {
      case TOUCH_ACTIONS.SWIPE_LEFT:
        dispatch(moveLeft());
        break;
      case TOUCH_ACTIONS.SWIPE_RIGHT:
        dispatch(moveRight());
        break;
      case TOUCH_ACTIONS.SWIPE_DOWN:
        dispatch(hardDrop());
        break;
      case TOUCH_ACTIONS.TAP:
        dispatch(rotate());
        break;
      case TOUCH_ACTIONS.DOUBLE_TAP:
        dispatch(pauseGame());
        break;
      default:
        break;
    }
  }, [dispatch]);

  return handleTouchAction;
};
