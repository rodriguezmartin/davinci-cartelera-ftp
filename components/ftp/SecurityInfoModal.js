import React, { Component } from 'react';
import { StyleSheet, Text, Linking } from 'react-native';

import Button from '../Button';
import CustomModal from '../CustomModal';

export default class SecurityInfoModal extends Component{

  open = ()=>{
    this.refs.modal.open();
  }

  openGithub = ()=>{
    Linking.openURL('https://github.com/rodriguezmartin/davinci-cartelera-ftp');
  }
  
  render(){
    return (
      <CustomModal ref="modal">
        <Text style={styles.title}>Sobre la seguridad</Text>
        <Text style={styles.mainText}>
          Esta aplicación guarda tus credenciales de forma <Text style={styles.bold}>encriptada</Text> en tu dispositivo y <Text style={styles.bold}>no son enviadas a ningún servidor</Text> intermediario, sólo son utilizadas para hacer una <Text style={styles.bold}>conexión directa</Text> entre tu dispositivo y el servidor de archivos de la <Text style={styles.bold}>Escuela Da Vinci</Text> mediante un cliente FTP integrado.
          Para más detalles sobre la manipulación de las credenciales el código fuente de la aplicación se encuentra en <Text style={styles.link} onPress={this.openGithub}>GitHub</Text>.
        </Text>
        <Button 
          onPress={()=>{this.refs.modal.close();}} 
          title="Entiendo" 
          transparent={true}/>
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
  link: {
    textDecorationLine: 'underline'
  }
});