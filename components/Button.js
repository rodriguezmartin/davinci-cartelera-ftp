import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({ title, iconName, onPress, transparent }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={[styles.button, transparent && styles.transparentButton]}>
      {iconName ? <Icon style={[styles.buttonIcon, transparent && styles.transparentIcon]} name={iconName} size={16}/> : null}
      <Text style={[styles.text, transparent && styles.transparentText]}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    backgroundColor: '#33c1ad',
    padding: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  transparentButton: {
    backgroundColor: 'transparent'
  },
  icon: {
    color: '#fff'
  },
  transparentIcon: {
    color: '#296059'
  },
  text: {
    color: '#fff',
    marginHorizontal: 3
  },
  transparentText: {
    color: '#296059',
    fontWeight: '500'
  }
});