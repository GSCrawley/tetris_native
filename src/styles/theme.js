import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0a0a0a',
  background: '#ffffff',
  grid: '#eeeeee',
  // We'll add tetromino colors here
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

// We'll expand this with more styles later
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
