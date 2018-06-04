import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

import pubsub from 'pubsub-js';
import startAnimation from '../lib/startAnimation';

export default class Panel extends Component {
  constructor(props){
    super(props);
    this.state = {
      shown: false,
      panelAnimation: new Animated.Value(-150),
      backdropAnimation: new Animated.Value(0)
    }
  }
  componentDidMount(){
    this.pubsub_subscription = pubsub.subscribe(this.props.subscribeTo,this.togglePanelVisibility);
  }
  componentWillUnmount(){
    pubsub.unsubscribe(this.pubsub_subscription);
  }

  togglePanelVisibility = ()=>{
    let animate = (Callback)=>{
      startAnimation([
        {
          animation: this.state.panelAnimation,
          toValue: panelValue,
          duration: 200,
          Callback: Callback || function(){}
        },
        {
          animation: this.state.backdropAnimation,
          toValue: backdropValue,
          duration: 200
        }
      ]);
    };

    let changeState = (Callback)=>{
      this.setState((prev)=>{
        return {
          ...prev,
          shown: !prev.shown
        }
      }, typeof Callback === 'function' ? Callback : null)
    }

    let backdropValue, panelValue;
    if(!this.state.shown){
      backdropValue = 1;
      panelValue = 0;
      changeState(animate);
    }
    else{
      backdropValue = 0;
      panelValue = -150;
      animate(changeState);
    }
  }

  render(){
    return (
      <TouchableWithoutFeedback onPress={()=>{this.togglePanelVisibility();}}>
        <Animated.View style={[styles.backdrop, this.state.shown && styles.panelShown, {opacity: this.state.backdropAnimation}]}>
          <TouchableWithoutFeedback onPress={()=>{this.preventDefault = true;}}>
            <Animated.View style={[styles.panelBody,{top: this.state.panelAnimation}]}>
              {this.props.children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    maxHeight: 0,
    flex: 1,
    overflow: 'hidden',
    zIndex: 1,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.12)'
  },
  panelShown: {
    maxHeight: '100%'
  },
  panelBody: {
    top: -150,
    backgroundColor: '#fff',
    elevation: 6
  }
});