import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,SafeAreaView,TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import client from '../api/client';

 function ChangePassword(props){
     const {email} = props.route.params;
    const navigation = useNavigation();
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [decision, setDecision] = useState('');
    const handleChangeNewPassword= (text)=>{
        setNewPassword(text.trim());
    }
    const handleChangeConfirmPassword = (text)=>{
        setConfirmPassword(text.trim());
    }
    const save=async()=>{
        /*On vérifie si tous les passwords sont supérieurs à 7*/
        /** On vérifie si newPassword === confirmPassword*/
        /* */
        if(newPassword<8||confirmPassword<8) setDecision('Your password must be 8 characters minimum')
        else if(newPassword !== confirmPassword) setDecision("Your new password doesn't match with your confirm password")
        else{
                    /*On verifie si le mot de passe correspond avec le serveur*/
                    try {
                        await client.post('/forgotPassword',{email,newPassword},{
                        headers: {
                            Accept: 'application/json',
                          }
                        }).then((res)=>{
                          if(res.data.success){
                            navigation.dispatch(
                                StackActions.replace('welcome')
                              );
                          }
                          if(!res.data.success){
                            setDecision(res.data.message);
                            setTimeout(()=>{setDecision('')},3000)
                        }
                        })
                        
                        
                      } catch (error) {
                        console.log(error.message)
                      }
                    
        }
    }
  return( 
        <SafeAreaView style={{backgroundColor:'#000000', flex:1,margin:10,}}>
            <View style={{paddingTop:60}}>
            <Text style={{alignSelf:'center', color:'red', fontSize:14, paddingBottom:10}}>{decision}</Text>        
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text style={styles.textContent}>New Password</Text>
                </View>
                <View style={{borderBottomColor: '#7B7D7D',borderBottomWidth: 1,flexDirection:'row' ,justifyContent:'space-between',marginBottom:40,marginTop:20}}>
                  <TextInput value={newPassword} onChangeText={(text) => handleChangeNewPassword(text)} secureTextEntry autoCorrect={false} autoCapitalize='none' enablesReturnKeyAutomatically   placeholder='**********' placeholderTextColor='#938f8f' style={styles.TextInputComponent} /> 
                </View>        
                
                <View style={{marginBottom: 5}}>
                        <Text style={styles.textContent}>Confirm New Password</Text>
                </View>
                <View style={{borderBottomColor: '#7B7D7D',borderBottomWidth: 1,flexDirection:'row' ,justifyContent:'space-between',marginBottom:40,marginTop:20}}>
                  <TextInput value={confirmPassword} onChangeText={(text) => handleChangeConfirmPassword(text)}  secureTextEntry autoCorrect={false} autoCapitalize='none' enablesReturnKeyAutomatically placeholder='**********' placeholderTextColor='#938f8f' style={styles.TextInputComponent} />
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={save}>
                <AntDesign name="checkcircle" size={50}  style={{color:'#008080',alignSelf:'center'}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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

export default ChangePassword;
