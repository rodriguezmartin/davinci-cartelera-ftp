import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import pubsub from 'pubsub-js';
import commonStyles from './styles';

export default class CarteleraSearch extends Component{
  render(){
    return (
      <View style={commonStyles.header}>
        <TouchableNativeFeedback onPress={()=>{
          pubsub.publish('onSearchValueChange',null);
          this.props.setLayout(1);
        }}>
          <Icon style={styles.iconNoText} name="arrow-back"/>
        </TouchableNativeFeedback>
        <TextInput 
          style={styles.searchInput}
          autoFocus={true}
          underlineColorAndroid='transparent'
          placeholder="Buscar materia"
          placeholderTextColor="rgba(255,255,255,.7)"
          onChangeText={(value)=>{
            pubsub.publish('onSearchValueChange',value);
          }}
          selectTextOnFocus={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconNoText: {
    padding: 14,
    paddingRight: 10,
    fontSize: 22,
    color: '#fff'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingRight: 10
  },
});