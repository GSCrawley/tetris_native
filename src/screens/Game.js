import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GameBoard from '../components/GameBoard';
import NextPiece from '../components/NextPiece';
import ScoreBoard from '../components/ScoreBoard';
import { useGameLoop } from '../hooks/useGameLoop';
import { moveDown } from '../redux/slices/gameSlice';
import { GAME_STATES } from '../utils/constants';

const Game = () => {
  const dispatch = useDispatch();
  const { gameState, speed } = useSelector((state) => state.game);

  useGameLoop(
    gameState,
    speed,
    () => {
      dispatch(moveDown());
    }
  );

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.gameContainer}>
            <GameBoard />
            <View style={styles.sidePanel}>
              <NextPiece />
              <ScoreBoard />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
  },
  sidePanel: {
    justifyContent: 'flex-start',
    gap: 20,
  },
});

export default Game;
