import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Game from './src/screens/Game';

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
