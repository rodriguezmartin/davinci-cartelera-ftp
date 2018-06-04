import React, { Component } from 'react';
import { View, Text } from 'react-native';

import HeaderButton from '../HeaderButton';

import pubsub from 'pubsub-js';
import commonStyles from './styles';

export default class FtpButtons extends Component{
  render(){
    return (
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>FTP</Text>
        <HeaderButton
          onPress={()=>{
            pubsub.publish('onPressInfo',true);
          }}
          iconName='info-outline'/>
        <HeaderButton
          onPress={()=>{
            pubsub.publish('onPressAjustes',true);
          }}
          iconName='tune'
          title='Ajustes'/>
      </View>
    );
  }
}