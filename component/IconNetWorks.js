import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,TextInput } from 'react-native';
 
function IconNetworks({path}){
     
  return(

            <View>
                    <Image style={styles.icon} source={path}/>
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop:150,
        //alignItems: 'center',
        //justifyContent: 'center',
      },
  icon:{
      width: 80,
      height:80,
      //borderColor:'#008080',
      borderWidth:3,
      borderRadius: 50,
      marginBottom : 5,
      
      //backgroundColor:'#FFF'
  },
  
  
});

export default IconNetworks;
