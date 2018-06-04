import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class MateriaCard extends Component{
  render(){
    const { data } = this.props; 
    const statusStyle = (data.estado == 'Cancelada') ?
      styles.statusRed :
      (data.lugar.largo == 'Sin asignar') ?
        styles.statusYellow :
        styles.statusGreen;

    return (
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {data.nombre}
          </Text>
          <View style={[styles.status, statusStyle]}></View>
        </View>
        <Text style={[styles.text, styles.sub]}>
          {data.lugar.largo}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Comisión: </Text>
          {data.catedra.largo}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Docente: </Text>
          {data.docente}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Horario: </Text>
          {data.horario}
        </Text>
        <Text style={[styles.text, data.estado === 'Cancelada' && styles.textRed]}>
          <Text style={styles.bold}>Estado: </Text>
          {data.estado}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff', 
    flex: 1,
    padding: 17
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingTop: 2,
    paddingBottom: 6
  },
  titleText: {
    fontSize: 19,
    maxWidth: '95%'
  },
  sub: {
    fontSize: 15,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8
  },
  text: {
    padding: 4
  },
  textRed: {
    color: '#d67a7a'
  },
  bold: {
    fontWeight: 'bold'
  },
  status: {
    width: 11,
    height: 11,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 2,
    backgroundColor: '#ddd'
  },
  statusGreen: {
    backgroundColor: '#91d183'
  },
  statusYellow: {
    backgroundColor: '#d8b55e'
  },
  statusRed: {
    backgroundColor: '#d67a7a'
  }
});