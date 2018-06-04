import { ToastAndroid } from 'react-native';

export default function(text){
  ToastAndroid.showWithGravity(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
}