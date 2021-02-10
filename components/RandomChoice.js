import * as React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet } from 'react-native';

export default class RandomChoice extends React.Component {
  render() {
    return (
      <Text
        style={[styles.randomNumber, this.props.isSelected && styles.selected]} >
        {this.props.randomNumber}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  randomNumber: {
    backgroundColor: '#555',
    width: 100,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 30,
    alignSelf: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});
