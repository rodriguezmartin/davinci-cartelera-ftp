import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';

import contexts from '../../lib/contexts';

export default class ComboList extends Component{

  apply(value){
    const { setFilter, filter } = this.props;
    setFilter(filter.filter, value);
  }

  render(){
    return (
      <contexts.panelCtx.Consumer>
        {(panelActions)=>
          <View style={styles.panelBody}>
            {this.props.filter.options.map((option, i)=> (
              <TouchableNativeFeedback key={i} onPress={()=>{
                this.props.setFilter(this.props.filter.id, option.value);
                panelActions.closeBottomPanel();
              }}>
                <View style={styles.listItem}>
                  <Text style={[styles.listItemIcon, option.color && {borderColor: option.color, color: option.color}]}>{option.value}</Text>
                  <Text style={styles.listItemText}>{option.name}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        }
      </contexts.panelCtx.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  panelBody: {
    backgroundColor: '#fff', 
    flex: 1
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row'
  },
  listItemText: {
    fontSize: 15
  },
  listItemIcon: {
    paddingTop: 3,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#308c7d',
    color: '#308c7d',
    fontSize: 10,
    marginRight: 10,
    minWidth: 30,
    textAlign: 'center'
  }
});