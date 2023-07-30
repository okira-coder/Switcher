import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,SafeAreaView,TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import client from '../api/client';

 function UpdatePassword({token}){
    let colorSave ='#fff';
    const navigation = useNavigation();
    const [password,setPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [decision, setDecision] = useState('');
    const handleChangePassword = (text)=>{
        setPassword(text.trim());
        console.log(text)
    }
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
        if(password<8||newPassword<8||confirmPassword<8) setDecision('Your password must be 8 characters minimum')
        else if(newPassword !== confirmPassword) setDecision("Your new password doesn't match with your confirm password")
        else if(password===newPassword) setDecision("Your new password is the same with your password")
        else{
                    /*On verifie si le mot de passe correspond avec le serveur*/
                    try {
                        await client.post('/updatePassword',{password,newPassword},{
                        headers: {
                            Accept: 'application/json',
                            session : `JWT ${token}`,
                          }
                        }).then((res)=>{
                          if(res.data.success){
                            navigation.goBack();
                          }
                          if(!res.data.success){
                            setDecision(res.data.message)
                        }
                        })
                        
                      } catch (error) {
                        console.log(error.message)
                      }
                    
        }
    }
  return( 
      <View style={{backgroundColor:'#000000', flex:1,margin:10}}>
        <SafeAreaView >
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>   
                    <Ionicons name="chevron-back" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={{color:'#fff', fontSize:16}}>Password</Text>
                <TouchableOpacity onPress={save}>
                <Text style={{color:colorSave, fontSize:16}}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:60}}>
            <Text style={{alignSelf:'center', color:'red', fontSize:14, paddingBottom:10}}>{decision}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text style={styles.textContent}>Old Password</Text>
                </View>
                <View style={{borderBottomColor: '#7B7D7D',borderBottomWidth: 1,flexDirection:'row' ,justifyContent:'space-between',marginBottom:40,marginTop:20}}>
                  <TextInput value={password}  secureTextEntry autoCorrect={false} autoCapitalize='none' enablesReturnKeyAutomatically placeholder='**********' placeholderTextColor='#938f8f' style={styles.TextInputComponent} onChangeText={(text) => handleChangePassword(text)}/>
                </View>        
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

export default UpdatePassword;
