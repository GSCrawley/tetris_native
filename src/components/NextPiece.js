import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import GridSquare from './GridSquare';
import { shapes } from '../utils';
import { GAME_DIMENSIONS } from '../utils/constants';

const NextPiece = () => {
  const nextShape = useSelector((state) => state.game.nextShape);
  const block = shapes[nextShape][0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next</Text>
      <View style={styles.preview}>
        {block.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <GridSquare
                key={`${rowIndex}-${colIndex}`}
                color={cell ? nextShape : 0}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preview: {
    transform: [{ scale: GAME_DIMENSIONS.PREVIEW_SCALE }],
  },
  row: {
    flexDirection: 'row',
  },
});

export default React.memo(NextPiece);
