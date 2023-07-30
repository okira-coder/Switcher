import React, { useState }  from 'react';
import { StyleSheet, Text,SafeAreaView,TextInput } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


 function Verification(){
    const [text, handleText] = useState();
    const change = ()=>{
       if(select == 0) setSelect(1)
       else setSelect(0)
    }
  return(
    <SafeAreaView style={[styles.container]}>
        <KeyboardAwareScrollView extraHeight={120} style={styles.keyboard} enableOnAndroid={true}>
            <Text style={styles.heading}>Please verify your email, PIN has been sent to your email</Text>
            <TextInput value={text} onChangeText={(val)=>handleText(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>
        </KeyboardAwareScrollView>    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop:150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading :{
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15
  }
  
});

export default Verification;
