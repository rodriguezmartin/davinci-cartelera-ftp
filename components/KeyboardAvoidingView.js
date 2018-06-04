import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

export default (props)=> (
  <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={76} {...props} />
);