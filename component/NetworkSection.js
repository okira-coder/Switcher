import React, { useState }  from 'react';
import { StyleSheet,View,  } from 'react-native';
import IconNetWorks from '../component/IconNetWorks'



function NetworkSection({img1,img2,img3}){
     
  return(
        <View style={styles.section1}>
            <IconNetWorks path={img1}/>
            <IconNetWorks path={img2}/>
            <IconNetWorks path={img3}/>               
        </View>
  );
};

const styles = StyleSheet.create({
  section1:{
      flexDirection :'row',
      alignItems:'flex-start',
      alignContent:'space-between',
      alignContent:'space-around',
      justifyContent: 'space-around',
      paddingBottom:20

  },
  icon:{
      width: 100,
      height:100,
      borderWidth:3,
      borderRadius: 20,
  },
  TextInputComponent:{
    borderWidth: 1,
    //borderColor: '#21423C',
     height: 35,
      borderRadius: 8,
       fontSize:16,
        color:'#fff',
        backgroundColor:'#fff'
    }
  
});

export default NetworkSection;
