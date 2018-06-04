import React, { Component } from 'react';
import { StyleSheet, View, FlatList, DeviceEventEmitter } from 'react-native';

import FTP from 'react-native-ftp';
import FileOpener from 'react-native-file-opener';
import DownloadNotification from 'react-native-download-notification';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FtpListItem from './FtpListItem';
import EmptyFolder from './EmptyFolder';
import PathBreadcrumbs from 'react-native-path-breadcrumbs';

import mimeLookup from '../../lib/mimeLookup';
import { STORAGE } from '../../lib/constants';
import toast from '../../lib/toast';

export default class FtpScreen extends Component{  
  constructor(props){
    super(props);
    this.state = {
      data: null,
      currentPath: {
        filePath: this.props.defaultPath ? this.props.defaultPath : '/', 
        isDir: true
      },
      refreshing: false
    }
  }
  componentDidMount(){
    this.list(this.state.currentPath);
    DownloadNotification.setup({
      downloadingLabel: 'Descargando',
      completedLabel: 'Descarga Finalizada',
      failedLabel: 'Descarga Fallida',
      cancelledLabel: 'Descarga Cancelada'
    });
  }

  list = async(item)=>{
    try{
      await this.checkConnection();
      const list = await FTP.list(item.filePath);
      this.setState({
        currentPath: item,
        data: list,
        refreshing: false
      });
    }
    catch(e){
      toast('No se puede leer el directorio.');
    }
  }

  checkConnection = ()=>{
    return new Promise(async (resolve, reject)=>{
      try{
        const resp = await FTP.getStatus();
        resolve(true);
      }
      catch(e){
        toast('No hay conexión con el servidor.');
        this.props.informError(e);
        reject(false);
      }
    });
  }

  handleIntent(intent){
    if(intent == 'open'){
      const fileName = this.getExtraInfo();
      FileOpener.open(STORAGE + fileName, mimeLookup(fileName))
      .catch((e)=>{
        FileOpener.open(STORAGE,'resource/folder')
        .catch((e)=>{
          toast('El archivo se encuentra en la carpeta "DaVinci FTP" de la memoria interna.');
        })
      });
    }
    else if(intent == 'cancel'){
      FTP.abort().then((success)=>{
        this.setStateCancelled();
      });
    }
  }

  download = async (item)=>{
    const noti = await this.newNotification(item);
    noti.setExtraInfo(item.name);
    try{
      await this.checkConnection();
      await FTP.downloadFile('FtpDownload'+ noti.getId(), item, null);
      noti.setStateCompleted();
      DeviceEventEmitter.removeListener('FtpDownload'+ noti.getId());
    }
    catch(e){
      noti.setStateFailed();
      toast('Ocurrió un error con la descarga');
    }
  }

  newNotification = async (item)=>{
    try{
      const noti = await DownloadNotification.create(item.name, this.handleIntent);
      DeviceEventEmitter.addListener('FtpDownload'+ noti.getId(), (progress)=>{
        noti.updateProgress(progress);
      });
      return noti;
    }
    catch(e){}
  }

  navigate = (item)=>{
    if(item.isDir){
      this.list(item);
    }
    else{
      this.download(item);
    }
  }

  handleRefresh = ()=>{
    this.setState((prev)=>{
      return {
        ...prev,
        refreshing: true
      }
    },()=>{
      this.navigate(this.state.currentPath);
    });
  }

  getCurrentPath = ()=>{
    return this.state.currentPath.filePath;
  }

  render(){
    return (
      <View style={styles.body}>
        <PathBreadcrumbs 
          path={this.state.currentPath.filePath}
          onPressCrumb={(path)=>{this.navigate({filePath: path, isDir: true})}}
          rootTitle="Inicio"
          separator={<Icon name="chevron-right"/>}/>
        <View style={styles.listWrapper}>
          <FlatList 
            data={this.state.data}
            renderItem={(item) => <FtpListItem data={item} onPress={this.navigate}/>}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            ListEmptyComponent={<EmptyFolder noData={this.state.data === null}/>}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  listWrapper: {
    flex: 100
  }
});