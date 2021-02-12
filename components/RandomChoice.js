import * as React from 'react';
import PropTypes from 'prop-types';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class RandomChoice extends React.Component {
  handlePress = () => {
    if (!this.props.isSelected)
      this.props.onPress(this.props.id);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
      <Text
        style={[styles.randomNumber, this.props.isSelected && styles.selected]} >
        {this.props.randomNumber}
      </Text>
      </TouchableOpacity >
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
