import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default ErrorCard = ({ image, title, content, children })=>(
  <View style={styles.main}>
    { image ? React.cloneElement(image, {style: styles.image}) : null }
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{ content }</Text>
    { children }
  </View>
)

const styles = StyleSheet.create({
  main: {
    alignItems: 'center'
  },
  title: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '500'
  },
  content: {
    marginBottom: 15
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain'
  }
});