import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MateriaCard from './MateriaCard';

import { COLORS } from '../../lib/constants';

export default class CarteleraRow extends PureComponent{
  render(){
    const { data, filters } = this.props;
    const { catedra, lugar } = data.item;
    frstyle = {style: {color: COLORS[catedra.carrera]}};
    return (
      <TouchableNativeFeedback onPress={()=>{this.props.panelActions.openBottomPanel(<MateriaCard data={data.item}/>,320)}}>
        <View style={[styles.tableRow, data.index % 2 === 0 && styles.tableRowEven]}>
          <View style={{marginRight: 10, flexDirection: 'row'}}>
            {filters.carrera === 'Todo' ? <Text {...frstyle}>{catedra.carrera}</Text> : null}
            {filters.turno === 'Todo' ? <Text {...frstyle}>{catedra.turno}</Text> : null}
            {filters.semestre === 'Todo' ? <Text {...frstyle}>{catedra.semestre}</Text> : null}
            {filters.comision === 'Todo' ? <Text {...frstyle}>{catedra.comision}</Text> : null}
          </View>
          <Text style={{flex: 7}}>{data.item.nombre}</Text>
          {data.estado === 'Cancelada' ?
            <Icon style={[styles.tableRowIcon, styles.tableRowIconRed]} name="highlight-off"/> :
              lugar.corto === '-' 
                ? <Icon style={[styles.tableRowIcon, styles.tableRowIconYellow]} name="help-outline"/> 
                : <Text style={{flex: 1, marginLeft: 10}}>{lugar.corto}</Text>
          }
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    height: 39
  },
  tableRowEven: {
    backgroundColor: '#f2f2f2'
  },
  tableRowIcon: {
    fontSize: 18,
    marginHorizontal: 10
  },
  tableRowIconRed: {
    color: '#d67a7a'
  },
  tableRowIconYellow: {
    color: '#d8b55e'
  },
});