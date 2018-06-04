import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

import FtpLogin from '../components/ftp/FtpLogin';
import FtpList from '../components/ftp/FtpList';
import Button from '../components/Button';
import Panel from '../components/Panel';
import PanelButton from '../components/PanelButton';
import ErrorCard from '../components/ErrorCard';
import SecurityInfoModal from '../components/ftp/SecurityInfoModal';
import DirectoryInfoModal from '../components/ftp/DirectoryInfoModal';

import RNSecureKeyStore from 'react-native-secure-key-store';
import FTP from 'react-native-ftp';
import Preferences from 'react-native-key-value-storage';
import { FTP_IP, FTP_PORT, STORAGE } from '../lib/constants';
import toast from '../lib/toast';

export default class FtpScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      credentials: null,
      invalidCredentials: null,
      remembered: false,
      logged: false,
      loginFailed: false,
      defaultPath: null,
      loading: true
    }
  }
  async componentDidMount(){
    FTP.setup(FTP_IP, FTP_PORT, STORAGE);
    try{
      const data = await Promise.all([
        RNSecureKeyStore.get('username'),
        RNSecureKeyStore.get('password'),
        Preferences.get('defaultPath')
      ]);
      const [ username, password, defaultPath ] = data;
      if(username && password){
        this.setState({
          credentials: {
            username: username,
            password: password
          },
          remembered: true,
          defaultPath: defaultPath ? defaultPath : null,
          loading: false
        });
      }
      else{
        this.setState({loading: false});
      }
    }
    catch(errors){
      toast('No se pudieron guardar las credenciales');
    }
  }
  componentDidUpdate(){
    if(this.state.credentials && !this.state.logged && !this.state.loginFailed){
      this.login();
    }
  }

  submitCredentials = (data)=>{
    this.setState({
      credentials: {
        username: data.username,
        password: data.password
      },
      rememberMe: data.rememberMe
    });
  }

  login = async ()=>{
    if(!this.state.loading){
      this.setState({
        loading: true,
        loginFailed: false
      });
    }
    else{
      const { username, password } = this.state.credentials;
      try{
        await FTP.login(username, password);
        if(!this.state.remembered && this.state.rememberMe){
          await RNSecureKeyStore.set('username',username);
          await RNSecureKeyStore.set('password',password);
          this.setState({
            logged: true,
            loading: false,
            remembered: true
          });
        }
        else{
          this.setState({
            loading: false,
            logged: true,
            loginFailed: false
          });
        }
      }
      catch(e){
        if(this.state.remembered){
          this.setState({
            loading: false,
            loginFailed: true
          });
        }
        else{
          toast(e.message == '530' ? 'Usuario o contraseña incorrecta' : 'No hay conexión con el servidor.');
          this.setState({
            credentials: null,
            loading: false,
            invalidCredentials: {
              username: username,
              password: password,
              rememberMe: this.state.rememberMe
            }
          });
        }
      }
    }
  }

  logout = async ()=>{
    try{
      await RNSecureKeyStore.remove('username');
      await RNSecureKeyStore.remove('password');
      await Preferences.remove('defaultPath');
      this.refs.panelAjustes.togglePanelVisibility();
      this.setState({
        credentials: null,
        logged: false,
        remembered: false,
        defaultPath: null
      });
    }
    catch(e){
      toast('Error cerrando sesión');
    }
  }

  setDefaultPath = async ()=>{
    const defaultPath = this.refs.ftpList.getCurrentPath();
    try{
      await Preferences.set('defaultPath', defaultPath);
      this.setState({
        defaultPath: defaultPath
      });
      this.refs.panelAjustes.togglePanelVisibility();
      toast('Se estableció la carpeta predeterminada');
    }
    catch(e){
      toast('No se pudo establecer la carpeta predeterminada');
    }
  }

  informError = (err)=>{
    this.setState({logged: false});
  }

  render(){
    let content;
    if(this.state.loading){
      content = (
        <View style={styles.content}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    else if(this.state.credentials && this.state.loginFailed){
      content = (
        <View style={styles.content}>
          <ErrorCard
            image={<Image source={require('../assets/failedfetch.png')}/>}
            title="Algo salió mal"
            content="No hay conexión con el servidor">
            <Button title="Reintentar" iconName="autorenew" onPress={this.login} transparent={true}/>
          </ErrorCard>
        </View>
      );
    }
    else if(!this.state.credentials){
      content = <FtpLogin submit={this.submitCredentials} old={this.state.invalidCredentials}/>
    }
    else if(this.state.logged){
      content = <FtpList ref="ftpList" defaultPath={this.state.defaultPath} informError={this.informError}/>
    }
    else{
      content = null;
    }
    return (
      <View style={styles.stretch}>
        <View style={styles.stretch}>
          {content}
        </View>
        <Panel ref="panelAjustes" subscribeTo="onPressAjustes">
          <PanelButton title="Establecer como carpeta predeterminada" disabled={!this.state.logged} onPress={this.setDefaultPath}/>
          <PanelButton title="Desloguearse" disabled={!this.state.logged} onPress={this.logout}/>
        </Panel>
        <Panel ref="panelInfo" subscribeTo="onPressInfo">
          <PanelButton title="¿Donde están los archivos?" onPress={()=>{
            this.refs.modalDirectory.open();
            this.refs.panelInfo.togglePanelVisibility();
          }}/>
          <PanelButton title="¿Es seguro esto?" onPress={()=>{
            this.refs.modalSecurity.open();
            this.refs.panelInfo.togglePanelVisibility();
          }}/>
        </Panel>
        <DirectoryInfoModal ref="modalDirectory"/>
        <SecurityInfoModal ref="modalSecurity"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    height: '90%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  stretch: {
    flex: 1
  }
});