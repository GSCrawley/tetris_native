import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS } from '../utils';
import { GAME_DIMENSIONS } from '../utils/constants';
import { useBlockAnimation } from '../hooks/useBlockAnimation';

const GridSquare = ({ color = 0, isActive = false, isClearing = false }) => {
  const { animatedStyle, triggerLandingAnimation, triggerClearAnimation } = useBlockAnimation(isActive, color);

  React.useEffect(() => {
    if (isClearing) {
      triggerClearAnimation();
    }
  }, [isClearing]);

  React.useEffect(() => {
    if (isActive && color > 0) {
      triggerLandingAnimation();
    }
  }, [isActive, color]);

  return (
    <Animated.View 
      style={[
        styles.square,
        { backgroundColor: COLORS[color] },
        color > 0 && styles.block,
        animatedStyle
      ]}
    />
  );
};

const styles = StyleSheet.create({
  square: {
    width: GAME_DIMENSIONS.CELL_SIZE,
    height: GAME_DIMENSIONS.CELL_SIZE,
    borderWidth: 1,
    borderColor: '#444',
  },
  block: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default React.memo(GridSquare);
