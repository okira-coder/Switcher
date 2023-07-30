import { useEffect, useRef, useState } from 'react';
import {View ,Text,TouchableOpacity,Dimensions,Animated,StyleSheet } from 'react-native';
import {MotiView} from '@motify/components'
import { Easing } from 'react-native-reanimated';

function Tap({show,numberOfUserAround}){  
  //let [colorAnime,changeColor] = useState('#000');
  let colorAnime = '#000';
  console.log('index');

  return(
      <View >
        <View
      style = {[styles.view1]}
      underlayColor = '#ccc'
    >
           {
             [...Array(3).keys()].map((index)=>{
               if(index === 2) colorAnime = '#008080'
               if(index === 1) colorAnime = '#00597f';
               return(
                <MotiView
                from={{opacity:0.7, scale: 1}}
                animate = {{opacity:0,scale:4}}
                transition={{
                  type: 'timing',
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index*400,
                  loop:true
                }}
                key={index}
                style = {[StyleSheet.absoluteFillObject,styles.view1,{borderColor:colorAnime}]}
                underlayColor = '#ccc'
              />
              
               )
             })
           }
           <View style={[{justifyContent:'center',alignItems:'center'}]}>
              {show==1?<Text style={{fontSize:26,color:'black',fontWeight:'bold'}} >TAP</Text>:
              <Text style={{color:'#000000',fontSize:50}}>
              {numberOfUserAround}
        </Text>}
            </View> 
        </View>
      </View>
    )
    
}
const styles = StyleSheet.create({
  view1:{
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: 100,
    height: 100,
    backgroundColor:'#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth : 2,
  },
 
})
export default Tap;