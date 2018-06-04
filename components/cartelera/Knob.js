import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import ComboList from './ComboList';

import contexts from '../../lib/contexts';

export default class Knob extends Component{
  render(){
    const current = this.props.current[this.props.filter.id];
    return (
      <contexts.panelCtx.Consumer>
        {(panelActions) => 
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.knobCircle, current != 'Todo' && styles.knobCircleFull]}
            onSelect={(event)=>{event.stopPropagation();}}
            onPress={(event)=>{
              event.stopPropagation();
              panelActions.openBottomPanel(
                <ComboList 
                  filter={this.props.filter} 
                  setFilter={(filter, value)=>{
                    this.props.setFilter(filter, value);
                    panelActions.closeBottomPanel();
                  }}/>,
                this.props.filter.options.length * 50
              )
            }}
          >
            <Text style={[styles.knobCircleText, current != 'Todo' && styles.knobCircleTextFull]}>
              {current}
            </Text>
          </TouchableOpacity>
        }
      </contexts.panelCtx.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  knobCircle: {
    width: 50,
    height: 50,
    borderColor: '#308c7d',
    borderWidth: 1,
    borderRadius: 30
  },
  knobCircleFull: {
    backgroundColor: '#33c1ad',
    borderColor: '#33c1ad'
  },
  knobCircleText: {
    fontSize: 14,
    color: '#308c7d',
    paddingTop: 15,
    paddingBottom: 15,
    width: 48,
    textAlign: 'center'
  },
  knobCircleTextFull: {
    color: '#fff'
  }
});