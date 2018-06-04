import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import extToIco from '../../lib/fileExtensionToIcon';

export default ({ data, onPress })=>{
  let item = data.item;
  let iconName;
  if(item.isDir){
    iconName = extToIco.folder;
  }
  else{
    const fileExtension = item.name.split('.').pop();
    iconName = extToIco[fileExtension] || extToIco.default;
  }
  return (
    <TouchableNativeFeedback onPress={()=>{onPress(item)}}>
      <View style={[styles.listItem, data.index % 2 === 0 && styles.listItemEven]}>
        <Icon style={styles.listItemIcon} name={iconName}/>
        <Text style={styles.listItemText}>{item.name}</Text>
        {!item.isDir ? <Text>{item.readableSize}</Text> : null}
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemEven: {
    backgroundColor: '#f2f2f2'
  },
  listItemText: {
    marginHorizontal: 7,
    flex: 1
  },
  listItemIcon: {
    fontSize: 17
  },
  listItemSize: {
    color: '#b7b7b7',
    fontSize: 12
  }
});