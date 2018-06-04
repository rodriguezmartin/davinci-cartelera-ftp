import React, { Component } from 'react';
import { View, Text } from 'react-native';

import HeaderButton from '../HeaderButton';

import pubsub from 'pubsub-js';
import commonStyles from './styles';

export default class CarteleraButtons extends Component{
  render(){
    return (
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>Cartelera</Text>
        <HeaderButton 
          onPress={()=>{this.props.setLayout(2);}}
          iconName='search'
          title='Buscar'/>
        <HeaderButton
          onPress={()=>{
            pubsub.publish('onPressFiltrar',true);
          }}
          iconName='filter-list'
          title='Filtrar'/>
      </View>
    );
  }
}