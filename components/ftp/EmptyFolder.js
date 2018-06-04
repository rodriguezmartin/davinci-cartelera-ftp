import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

import ErrorCard from '../ErrorCard';

export default class EmptyFolder extends Component{
  render(){
    if(this.props.noData){
      return (
        <View style={[styles.container,{padding: 20}]}>
          <ActivityIndicator size="small"/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ErrorCard
          image={<Image source={require('../../assets/emptyfolder.png')}/>}
          title="No hay nada"
          content="Esta carpeta esta vacía"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '97%'
  }
});