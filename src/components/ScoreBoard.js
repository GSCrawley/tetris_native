import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ScoreBoard = () => {
  const { score, gameState } = useSelector((state) => state.game);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>{gameState}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginVertical: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  score: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'center',
  },
  status: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default React.memo(ScoreBoard);
