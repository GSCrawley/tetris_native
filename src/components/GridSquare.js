import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../utils';
import { GAME_DIMENSIONS } from '../utils/constants';

const GridSquare = ({ color = 0 }) => {
  return (
    <View 
      style={[
        styles.square,
        { backgroundColor: COLORS[color] },
        color > 0 && styles.block
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
