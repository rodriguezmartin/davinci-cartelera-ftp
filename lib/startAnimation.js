import { Animated, Easing } from 'react-native';

function startAnimation(animation){
  if(!animation.animation) return false;
  let params = {
    toValue: 0,
    duration: 500,
    easing: Easing.bezier(0,.65,.28,1),
    Callback: ()=>{},
    ...animation
  }
  Animated.timing(
    params.animation,
    {
      toValue: params.toValue,
      duration: params.duration,
      easing: params.easing
    }
  ).start(params.Callback);
}

export default function(animations){
  if(Array.isArray(animations)){
    animations.forEach((animation)=>{
      startAnimation(animation)
    });
  }
  else{
    startAnimation(animations);
  }
}
