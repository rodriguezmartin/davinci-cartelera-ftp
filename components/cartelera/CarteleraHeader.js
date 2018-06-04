import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class CarteleraRow extends Component{
  render(){
    return (
      <View style={styles.tableRow}>
        <Text style={{marginRight: 10, fontWeight: 'bold'}}>Comisi.</Text>
        <Text style={{flex: 7, fontWeight: 'bold'}}>Materia</Text>
        <Text style={{flex: 1, marginLeft: 10, fontWeight: 'bold'}}>Aula</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    height: 39
  }
});