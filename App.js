import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Header from './components/header/Header';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './components/TabBar';
import CarteleraScreen from './screens/CarteleraScreen';
import FtpScreen from './screens/FtpScreen';
import SlidingUpPanel from 'rn-sliding-up-panel';

import contexts from './lib/contexts';

export default class dv extends Component {
  constructor(props){
    super(props);
    this.state = {
      panelVisible: false,
      panelData: null,
      panelHeight: {top: 0, bottom: 0},
      headerLayout: 1
    };
  }
  componentDidMount(){
    SplashScreen.hide();
  }

  ScrollableTabViewProps = {
    tabBarPosition: "bottom",
    tabBarBackgroundColor: "#0f232f",
    tabBarInactiveTextColor: "#fff",
    tabBarActiveTextColor: "#33c1ad",
    tabBarUnderlineStyle: styles.navbarIndicator,
    renderTabBar: () => <TabBar/>,
    onChangeTab: (current)=>{
      const layout = current.i == 0 ? 1 : 3; 
      this.setState((prev)=>{
        return {
          ...prev,
          headerLayout: layout
        }
      })
    }
  }

  openBottomPanel = (content, height)=>{
    this.setState((prev)=>{
      return {
        ...prev,
        panelContent: content,
        panelHeight: {top: height, bottom: 0},
        panelVisible: true
      }
    })
  }

  closeBottomPanel = (data)=>{
    this.setState((prev)=>{
      return {
        ...prev,
        panelVisible: false,
        panelData: null
      }
    })
  }

  bottomPanelActions = {
    openBottomPanel: this.openBottomPanel,
    closeBottomPanel: this.closeBottomPanel
  }

  render(){
    return (
      <contexts.panelCtx.Provider value={this.bottomPanelActions}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0,0,0,.18)"/>
        <View style={styles.body}>
          <Header layout={this.state.headerLayout}/>
          <View style={styles.content}>
            <ScrollableTabView {...this.ScrollableTabViewProps}>
              <CarteleraScreen tabLabel="Cartelera" tabIcon="dvr"/>
              <FtpScreen tabLabel="FTP" tabIcon="cloud-queue"/>
            </ScrollableTabView>
          </View>
          <SlidingUpPanel
            visible={this.state.panelVisible}
            onRequestClose={this.closeBottomPanel}
            draggableRange={this.state.panelHeight}>
            {this.state.panelContent}
          </SlidingUpPanel>
        </View>
      </contexts.panelCtx.Provider>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1
  },
  content: {
    flex:1
  },
  navbarIndicator: {
    borderTopColor: '#fff',
    borderTopWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    width: 0,
    top: 0,
    backgroundColor: 'transparent',
    marginLeft: Dimensions.get('window').width / 4 - 8
  }
});