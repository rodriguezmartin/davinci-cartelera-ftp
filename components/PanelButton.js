import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native';

export default ({ title, onPress, disabled }) => (
  <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
    <View style={styles.btn}>
      <Text style={[styles.btnText, disabled && styles.btnTextDisabled]}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row'
  },
  btnText: {
    fontSize: 15
  },
  btnTextDisabled: {
    color: '#b2b2b2'
  }
});