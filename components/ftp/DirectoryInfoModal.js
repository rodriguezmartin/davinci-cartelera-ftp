import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../Button';
import CustomModal from '../CustomModal';

import FileOpener from 'react-native-file-opener';

import { STORAGE } from '../../lib/constants';
import toast from '../../lib/toast';

export default class DirectoryInfoModal extends Component{

  open = ()=>{
    this.refs.modal.open();
  }

  openDirectory = ()=>{
    FileOpener.open(STORAGE,'resource/folder')
    .catch((e)=>{
      toast('No se pudo abrir la carpeta, probá con un explorador de archivos.');
    })
  }
  
  render(){
    return (
      <CustomModal ref="modal">
        <Text style={styles.title}>Carpeta de descargas</Text>
        <Text style={styles.mainText}>
          Los archivos descargados se guardan en la carpeta 'DaVinci FTP' de la memoria interna
        </Text>
        <View style={styles.buttons}>
          <Button 
            onPress={this.openDirectory} 
            title="Abrir carpeta" 
            transparent={true}/>
          <Button 
            onPress={()=>{this.refs.modal.close();}} 
            title="Entiendo" 
            transparent={true}/>
        </View>
      </CustomModal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '600', 
    fontSize: 17, 
    marginVertical: 13
  },
  mainText: {
    lineHeight: 20,
    marginBottom: 5
  },
  bold: {
    fontWeight: '600'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});