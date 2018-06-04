import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderButton extends Component{
  render(){
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={styles.button}>
          <Icon style={styles.buttonIcon} name={this.props.iconName}/>
          { this.props.title ? <Text style={styles.buttonText}>{this.props.title}</Text> : null }
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    marginVertical: 13,
    marginRight: 10
  },
  buttonText: {
    color: '#fff',
    marginLeft: 3
  },
  buttonIcon: {
    color: '#fff',
    paddingTop: 2,
    fontSize: 16
  }
});