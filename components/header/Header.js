import React, { Component } from 'react';

import CarteleraButtons from './layouts/CarteleraButtons';
import CarteleraSearch from './layouts/CarteleraSearch';
import FtpButtons from './layouts/FtpButtons';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      layout: 1
    }
    this.layouts = {
      1: <CarteleraButtons setLayout={this.setLayout}/>,
      2: <CarteleraSearch setLayout={this.setLayout}/>,
      3: <FtpButtons/>
    }
  }
  static getDerivedStateFromProps(props){
    return {
      layout: props.layout
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextState === this.state ? false : true;
  }

  setLayout = (layoutId) => {
    this.setState({layout: layoutId});
  }

  render(){
    return this.layouts[this.state.layout];
  }
}