import React, { useEffect, useRef, useState }  from 'react';
import { StackActions } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image,SafeAreaView,TextInput, Dimensions,KeyboardAvoidingView, Keyboard } from 'react-native';
import client from '../api/client';

import AppLoader from '../component/AppLoader'

let newInputIndex = 0;
const inputs = Array(4).fill('');

const isObjetValid = (obj) =>{
  
  return Object.values(obj).every((val) =>{val.trim()})
}
 function EmailVerificationPassword(props){
   const {email} = props.route.params
     const input = useRef()
     const [OTP, setOTP] = useState({0:'', 1:'',2:'',3:''})
     const [nextInputIndex, setNextInputIndex] = useState(0);
     const [message,setMessage] = useState('');
    const handleChangeMessage = (valeur)=>{setMessage(valeur)}
    const [pending,setPending] = useState(false);

    const handleChangeText= (text,index)=>{
        const newOTP = {...OTP}
        newOTP[index] = text;
        setOTP(newOTP);
        const lastInputIndex = inputs.length -1
        if(!text) newInputIndex = index=== 0 ? 0 : index-1;
        else newInputIndex = index=== lastInputIndex ? lastInputIndex : index+1;
        
        setNextInputIndex(newInputIndex)
    }
    useEffect(()=>{
        input.current.focus();
      }, [newInputIndex]);
    const EmailverificationPassword = async(code)=>{
      setPending(true);
      try {
        await client.post('/emailVerificationPassword',{code:`${code}`,email:`${email}`,
        headers: {
            Accept: 'application/json',
          }
        }).then((res)=>{
            console.log('EmailVerificationPassword sendEmail res.data:', res.data);
          if(res.data.success){
            props.navigation.dispatch(
              StackActions.replace('ChangePassword', {
                email
              })
            );
          }
          if(!res.data.success){
            setPending(false)
            handleChangeMessage(message)
            } 
        })
        
      } catch (error) {
        console.log(error.message)
      }
    }

    const submitOTP = ()=>{
     Keyboard.dismiss();
      if(!isObjetValid(OTP)){
        let code = '';
        Object.values(OTP).forEach((v) =>{code += v;})
        console.log('(45 code)', code);
        EmailverificationPassword(code)
      }
    }
    
  return(
        <>
          <KeyboardAvoidingView style={styles.container}>
          <Text style={{color:'red', alignSelf:'center', paddingBottom:20}}>{message}</Text>
            <Text style={styles.heading}>Please verify your email, PIN has been sent to your email</Text>
            <View style={styles.optContainer}>
                {inputs.map((inp, index) => {
                    return(<View key={index.toString()} style={styles.inputContainer}>
                          <TextInput value={OTP[index]} onChangeText={(text)=>handleChangeText(text,index)}  style={styles.input} placeholder='0' placeholderTextColor={'#a0a3a8'} keyboardType ='numeric' maxLength={1} ref={nextInputIndex === index ? input : null} />
                    </View>)
                })
                }
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={submitOTP}>
                  <Text style={styles.button}>Reset</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
        {pending ? <AppLoader />:null}    
        </>
        
  );
};

const {width} = Dimensions.get('window');
const inputWidth = Math.round(width / 6);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  heading :{
    color: '#008080',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16
  },
  optContainer:{
      flexDirection : 'row',
      justifyContent: 'space-between',
      paddingHorizontal: inputWidth/2
  },
  inputContainer:{
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: '#008080',
    alignItems :'center',
    justifyContent: 'center'
  },
  input:{
    fontSize: 25,
    color: "#FFF",
    paddingHorizontal:15,
  },
  buttonContainer:{
    marginTop: 20,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
    width : inputWidth*2
  },
  button:{
    fontSize: 20,
    color:'#FFF'
  }
  
  
});

export default EmailVerificationPassword;
