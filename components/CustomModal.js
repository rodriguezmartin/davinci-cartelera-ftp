import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

export default class CustomModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  open = ()=>{
    this.setState({modalVisible: true})
  }

  close = ()=>{
    this.setState({modalVisible: false})
  }
  
  render(){
    return (
      <Modal 
        visible={this.state.modalVisible} 
        onRequestClose={()=>{this.setState({modalVisible: false})}}
        transparent={true}>
        <TouchableWithoutFeedback onPress={this.close}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback onPress={()=>{this.preventDefault = true}}>
              <View style={styles.container}>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.4)', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff', 
    margin: 20, 
    padding: 25, 
    paddingVertical: 10
  }
});