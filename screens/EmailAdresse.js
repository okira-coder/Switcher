import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,SafeAreaView,TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import client from '../api/client';

 function EmailAdresse(){
    const navigation = useNavigation();
    const [email,setEmail] = useState('')
    const handleChangeEmail = (text)=>{
        setEmail(text.trim());
    }
    const [decision, setDecision] = useState('');
    const send = async()=>{
        const regx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        console.log(regx.test(email),email)
        if(regx.test(email)){
            try {
                await client.post('/emailPassword',{email},{
                headers: {
                    Accept: 'application/json',
                }
                }).then((res)=>{
                if(res.data.success){
                    navigation.dispatch(
                        StackActions.replace('EmailVerificationPassword', {
                          email
                        })
                      );
                }
                if(!res.data.success){
                    setDecision(res.data.message)
                }
                })
                
            } catch (error) {
                console.log(error.message)
            }
        }else{
            setDecision('Inavalid Email');
            setTimeout(()=>{setDecision('')},3000)
        }
    } 
  return( 
      <View style={{backgroundColor:'#000000', flex:1,margin:10}}>
        <SafeAreaView >
            <View style={{flexDirection:'row', }}>
                <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>   
                    <Ionicons name="chevron-back" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={{color:'#fff', fontSize:16,alignSelf:'center',marginLeft:Dimensions.get('window').width/3.5}}>Email Adresse</Text>
            </View>
            <View style={{paddingTop:60}}>
            <Text style={{alignSelf:'center', color:'red', fontSize:14, paddingBottom:10}}>{decision}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text style={styles.textContent}>Email</Text>
                </View>
                <View style={{borderBottomColor: '#7B7D7D',borderBottomWidth: 1,flexDirection:'row' ,justifyContent:'space-between',marginBottom:40,marginTop:20}}>
                  <TextInput value={email} autoCapitalize='none' placeholder='Enter your e-mail address' placeholderTextColor='#938f8f' style={styles.TextInputComponent} onChangeText={(text) => handleChangeEmail(text)}/>
                </View>        
            </View>
            <TouchableOpacity onPress={send}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <MaterialCommunityIcons name="send-circle-outline" size={65} color="#008080" /> 
                </View>
            </TouchableOpacity>
        </SafeAreaView>
      </View>
      )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop:150,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  icon:{
    width:30,
    height:30
},
textSave:{  
    color:'#fff', 
    fontWeight:'normal',
    fontSize:30,
    alignSelf:'center'
},
textContent:{
    fontSize:16,
     fontWeight: 'normal',
      color:'#fff'
    },
TextInputComponent:{
       fontSize:14,
        marginBottom: 5,
        color:'#fff',
        width:Dimensions.get('window').width
    },
});

export default EmailAdresse;
