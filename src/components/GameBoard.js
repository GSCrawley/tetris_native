import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  withSequence, 
  withTiming,
  useSharedValue
} from 'react-native-reanimated';
import GridSquare from './GridSquare';
import { shapes } from '../utils';
import { useTouchControls } from '../hooks/useTouchControls';
import { useGameControls } from '../hooks/useGameControls';

const GameBoard = () => {
  const { 
    grid, 
    shape, 
    rotation, 
    x, 
    y, 
    completedRows 
  } = useSelector((state) => state.game);
  
  const handleGameAction = useGameControls();
  const handleGesture = useTouchControls(handleGameAction);
  const boardScale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      handleGesture(event);
    })
    .onEnd(() => {
      // Reset any gesture state if needed
    });

  // Animate board on row clear
  useEffect(() => {
    if (completedRows.length > 0) {
      boardScale.value = withSequence(
        withTiming(1.02, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    }
  }, [completedRows]);

  const animatedBoardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: boardScale.value }]
  }));

  // Get the current shape's grid
  const block = shapes[shape][rotation];

  // Copy the grid for modification
  const blockGrid = grid.map(row => [...row]);

  // Add the current moving piece to the grid
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const gridY = row + y;
        const gridX = col + x;
        if (gridY >= 0 && gridY < grid.length && gridX >= 0 && gridX < grid[0].length) {
          blockGrid[gridY][gridX] = shape;
        }
      }
    }
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedBoardStyle]}>
        {blockGrid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <GridSquare
                key={`${rowIndex}-${colIndex}`}
                color={cell}
                isActive={
                  rowIndex >= y &&
                  rowIndex < y + block.length &&
                  colIndex >= x &&
                  colIndex < x + block[0].length &&
                  block[rowIndex - y]?.[colIndex - x]
                }
                isClearing={completedRows.includes(rowIndex)}
              />
            ))}
          </View>
        ))}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
  },
});

export default GameBoard;
