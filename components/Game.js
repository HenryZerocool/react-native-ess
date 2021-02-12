import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomChoice from './RandomChoice';

export default class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedNoIndexs: [],
    gameTimer: 10,
    // gameTimerInterval: {}
  };
  componentDidMount() {
    this.gameTimerInterval = setInterval(() => {
      this.setState(
        (prevState) => {
          return {gameTimer: prevState.gameTimer - 1,}
        },
        () => {
          if (this.state.gameTimer === 0) clearInterval(this.gameTimerInterval);
        }
      );
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.gameTimerInterval);
  }
  randomNumberArr = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );
  target = this.randomNumberArr
    .slice(0, this.randomNumberArr.length - 2) // only a few numbers in the array needed for sum
    .reduce((acc, cur) => cur + acc, 0); // cal target base on numbers in array
  // TODO: shuffle the list

  isSelected = (numberIndex) => {
    return this.state.selectedNoIndexs.indexOf(numberIndex) >= 0;
  };
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedNoIndexs: [...prevState.selectedNoIndexs, numberIndex],
    }));
  };
  gameStatus = () => {
    const sum = this.state.selectedNoIndexs.reduce(
      (acc, curr) => acc + this.randomNumberArr[curr],
      0
    );
    if (sum > this.target || this.state.gameTimer === 0) return 'LOST';
    if (sum < this.target) return 'PLAYING';
    if (sum === this.target) return 'WON';
  };
  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${this.gameStatus()}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumberArr.map((number, index) => (
            <RandomChoice
              key={index}
              id={index}
              randomNumber={number}
              isDisable={
                this.isSelected(index) || this.gameStatus() !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <Text>
          {gameStatus}
          {this.state.gameTimer}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flex: 1,
    paddingTop: 10,
  },

  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  STATUS_PLAYING: {
    backgroundColor: '#aaa',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
