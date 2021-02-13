import * as React from 'react';
import Game from './components/Game';

export default class App extends React.Component {
  state = {
    gameId : 1,
  };
  playNewGame = () => {
    this.setState((prevState) => ({
      gameId : prevState.gameId + 1
    }))
  }
  render() {
    return <Game key={this.state.gameId} onPlayAgain={this.playNewGame} randomNumberCount={8} />;
  }
}
