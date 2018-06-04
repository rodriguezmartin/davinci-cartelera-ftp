import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import ErrorCard from '../ErrorCard';

export default class EmptyCartelera extends Component{
  render(){
    if(this.props.thereIsData){
      return (
        <View style={styles.container}>
          <ErrorCard
            image={<Image source={require('../../assets/emptysearch.png')}/>}
            title="No hay resultados"
            content="Probá modificando los filtros"/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ErrorCard
          image={<Image source={require('../../assets/emptydata.png')}/>}
          title="La nada misma"
          content="Parece que no hay nada programado para hoy"/>
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