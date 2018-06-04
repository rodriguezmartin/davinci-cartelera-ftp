import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, CheckBox, TouchableWithoutFeedback } from 'react-native';

import Button from '../Button';
import SecurityInfoModal from './SecurityInfoModal';
import KeyboardAvoidingView from '../KeyboardAvoidingView';

import toast from '../../lib/toast';

export default class FtpLogin extends Component{
  constructor(props){
    super(props);
    if(this.props.old){
      this.state = this.props.old;
    }
    else{
      this.state = {
        rememberMe: true,
        username: '',
        password: ''
      }
    }
  }

  onCheckBoxPress = ()=>{
    this.setState({rememberMe: !this.state.rememberMe});
  }

  submit = () =>{
    if(this.state.username && this.state.password){
      this.props.submit(this.state);
    }
    else{
      toast('Ambos campos son requeridos');
    }
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.body}>
        <View style={styles.form}>
          <Text style={styles.label}>Usuario Da Vinci</Text>
          <TextInput 
            {...commonInputProps}
            placeholder="nombre.apellido"
            value={this.state.username}
            onChangeText={(username)=>{this.setState({username});}}
            autoFocus={true}/>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            {...commonInputProps}
            placeholder="•••••••"
            value={this.state.password}
            onChangeText={(password)=>{this.setState({password});}}
            secureTextEntry={true}/>
          <TouchableWithoutFeedback onPress={this.onCheckBoxPress}>
            <View style={styles.checkbox}>
              <CheckBox value={this.state.rememberMe}/>
              <Text>Recordarme</Text>
            </View>
          </TouchableWithoutFeedback>
          <Button onPress={this.submit} title="Ingresar"/>
          <Button onPress={()=>{this.refs.modal.open();}} title="¿Es seguro esto?" transparent={true}/>
          <SecurityInfoModal ref="modal"/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  form: {
    width: '75%',
    padding: 10,
  },
  label: {
    margin: 0,
    marginTop: 15,
    paddingHorizontal: 5,
    fontWeight: '500'
  },
  input: {
    paddingTop: 3,
    margin: 0,
    fontSize: 17
  },
  checkbox: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  }
});

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: '#9c9c9c',
  placeholderTextColor: "#9c9c9c",
  autoCapitalize: "none"
}