import React, {useState, useEffect} from 'react';

import {Animated} from 'react-native';

 import { Small, Original } from './styles';

 const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({
    smallSource,
    aspectRatio,
    source,
    shouldLoad
}) {

    const opacity = new Animated.Value(0);
    const [load, setLoad] = useState(false);

    useEffect( () =>{
        if(shouldLoad){
            setLoad(true);
        }
    }, [shouldLoad])

    function handleAnimate(){
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

  return (
    <Small 
    source = {smallSource} 
    ratio = {aspectRatio} 
    resizeMode="contain"
    blurRadius={1}
      >
          {load &&
          <OriginalAnimated
          style={{opacity}}
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimate}
          />
          }
      </Small>

    
  );
}
