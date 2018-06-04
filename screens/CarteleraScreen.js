import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Cartelera from '../components/cartelera/Cartelera';
import Panel from '../components/Panel';
import Knob from '../components/cartelera/Knob';
import KeyboardAvoidingView from '../components/KeyboardAvoidingView';

import Preferences from 'react-native-key-value-storage';
import { FILTERS } from '../lib/constants';

export default class CarteleraScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      filters: {
        carrera: 'Todo',
        turno: 'Todo',
        semestre: 'Todo',
        comision: 'Todo'
      },
      filtersShown: false
    };
  }
  async componentDidMount(){
    try{
      const defaultFilters = await Preferences.get('defaultFilters');
      if(defaultFilters){
        this.setState({
          filters: JSON.parse(defaultFilters)
        });
      }
    }
    catch(e){}
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextState === this.state ? false : true;
  }

  setFilter = (filter, value)=>{
    this.setState((prev)=>{
      return {
        ...prev,
        filters: {
          ...this.state.filters,
          [filter]: value
        }
      }
    },()=>{
      Preferences.set('defaultFilters', JSON.stringify(this.state.filters))
    });
  }

  toggleFiltersPanel = ()=>{
    this.setState({filtersShown: !this.state.filtersShown});
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.mainView}>
        <Cartelera filters={this.state.filters} query={this.state.query}/>
        <Panel subscribeTo="onPressFiltrar">
          <View style={styles.knobs}>
            {FILTERS.map((filter)=>
              <View style={styles.knob} key={filter.id}>
                <Text style={styles.knobLabel}>{filter.name}</Text>
                <Knob filter={filter} current={this.state.filters} setFilter={this.setFilter}/>
              </View>
            )}
          </View>
        </Panel>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  knobs: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  knob: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  knobLabel: {
    textAlign: 'center',
    marginBottom: 5
  }
});