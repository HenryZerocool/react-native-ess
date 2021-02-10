import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomChoice from './RandomChoice'

export default class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedNumbers : [0,4]
  }
  randomNumberArr = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );
  target = this.randomNumberArr
    .slice(0, this.randomNumberArr.length - 2) // only a few numbers in the array needed for sum
    .reduce((acc, cur) => cur + acc, 0); // cal target base on numbers in array
    // TODO: shuffle the list 

  isSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
        {this.randomNumberArr.map((number, index) => (
          <RandomChoice key={index} randomNumber={number} isSelected={this.isSelected(index)}/>
        ))}
        </View>
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
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },

});
