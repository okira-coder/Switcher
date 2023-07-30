import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {   TouchableWithoutFeedback } from 'react-native-web';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { Ionicons } from '@expo/vector-icons';
import client from '../api/client';
//
function Update({name,content,token,user}){
    const navigation = useNavigation();
    let maxLengthCharac = 0;
    ({name}.name) === 'Bio' ?  maxLengthCharac = 450 : maxLengthCharac = 30
    
    const oldName = {content}.content.trim()
    const [contentName, setContentName] = useState(oldName);
    const [value,setValue] = useState(oldName)
    const [colorSave, setColor] = useState('#7B7D7D');
    const [saving, changeSaving] = useState(0);
    const [isInvalid, setInvalidate] = useState(0);
    const [message, setMessage] = useState('');

    const handleChangeMessage = (value)=>{
        setMessage(value);
    }
    const handleChangeText = (text)=>{
        const val = text.replace(/(\r\n|\n|\r)/gm,"");
        setValue(val);
        if({name}.name != 'Bio'){
                if((text.length<2) || contentName===text){
                setColor('#7B7D7D')
            }
            else{
                if(isValidName(text)&&({name}.name === 'Name')){
                    setColor('#7B7D7D')
                }
                if(isValidPseudo(text)&&({name}.name === 'Pseudo')){
                    console.log('validPseudo')
                    setColor('#7B7D7D')
                }
            }
        }else{
            if(contentName===text){
                setColor('#7B7D7D')
            }else{
                setColor('#7B7D7D')
            }
        }
        
        console.log(colorSave,contentName===text,isValidPseudo(text),{name}.name);
    }
    const isValidName = (text)=>{
        const regx =/^[\p{L} ,.'-]+$/u;
        return regx.test(text);
    }
    const isValidPseudo = (text)=>{
        const regx = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
        console.log(regx.test(text));
        return regx.test(text);
    }
    const save = async()=>{
        if({name}.name === 'Name'){
            console.log('nameSaving', value);
            if(isValidName(value.trim())&&value.length>1&&contentName!==value){
                try {
                    await client.post('/updateName',{value},{
                    headers: {
                        Accept: 'application/json',
                        session : `JWT ${token}`,
                      }
                    }).then((res)=>{
                      if(res.data.success){
                        user.name = value;
                        changeSaving(1);
                        setTimeout(()=>{changeSaving(0)},3000)
                        setContentName(value);
                      }
                      if(!res.data.success){
                        handleChangeMessage(res.data.message)
                    }
                    })
                    
                  } catch (error) {
                    console.log(error.message)
                  }
                
            }else{
                setInvalidate(1);
                setTimeout(()=>{setInvalidate(0);},3000)
        }

        }
        if({name}.name === 'Pseudo'){
            if(isValidPseudo(value.trim())&&value.length>2&&contentName!==value){
                try {
                    await client.post('/updatePseudo',{value},{
                    headers: {
                        Accept: 'application/json',
                        session : `JWT ${token}`,
                      }
                    }).then((res)=>{
                        console.log('network', res.data);
                      if(res.data.success){
                        user.pseudo = value;
                        changeSaving(1);
                        setTimeout(()=>{changeSaving(0)},3000)
                        setContentName(value);
                      }
                      if(!res.data.success){
                        handleChangeMessage(res.data.message)
                    }
                    })
                    
                  } catch (error) {
                    console.log(error.message)
                  }
                
            }else{
                setInvalidate(1);
                setTimeout(()=>{setInvalidate(0);},3000)
            }

        }
        if({name}.name === 'Bio'){
            if(contentName!==value){
                try {
                    await client.post('/updateBio',{value},{
                    headers: {
                        Accept: 'application/json',
                        session : `JWT ${token}`,
                      }
                    }).then((res)=>{
                      if(res.data.success){
                        user.bio = value;
                        changeSaving(1);
                        setTimeout(()=>{changeSaving(0)},3000)
                      }
                      if(!res.data.success){
                        handleChangeMessage(res.data.message)
                    }
                    })
                    
                  } catch (error) {
                    console.log(error.message)
                  }
                
            }else{
                setInvalidate(1);
                setTimeout(()=>{setInvalidate(0);},3000)
            }
        }
        setColor('#7B7D7D')
    }
    console.log('Invalid', isInvalid);
  return( 
      <View style={{backgroundColor:'#000000', flex:1,margin:10}}>
        <SafeAreaView >
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>
                    <Ionicons name="chevron-back" size={24} color="#fff"/>
                </TouchableOpacity>
                <Text style={{color:'#fff', fontSize:20}}>{name}</Text>
                <TouchableOpacity onPress={save}>
                <Text style={{color:colorSave, fontSize:20}}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:40}}>
                <Text style={{color:'red', padding:10}}>{message}</Text>
                <View style={{backgroundColor: value,borderBottomColor: '#7B7D7D',borderBottomWidth: 1,flexDirection:'row' ,justifyContent:'space-between'}}>
                    <AutoGrowingTextInput 
                    editable 
                    textAlignVertical='top'
                    maxLength={maxLengthCharac}
                    //multiline={true}
                    //numberOfLines={4}
                    maxHeight={200}
                    minHeight={45}
                    onChangeText={(text) => handleChangeText(text)}
                    value={value}
                    style={{padding: 10, color:"#FFF",width:Dimensions.get('window').width}}
                    
                    />
                    {(isInvalid ===1)? <Text style={{color:'red'}}>Invalid</Text>:null}
                </View >
                <Text style={{color:'#7B7D7D', marginTop:10, alignSelf:'flex-end', fontSize:16}}>{value.length}/{maxLengthCharac}</Text>
            </View>
            {saving==1 ? <Text style={styles.textSave}>Saved !</Text>:null}
        </SafeAreaView>
      </View>
    
    
    )
}

const styles = StyleSheet.create({
    icon:{
        color:'#7B7D7D'
    },
    textSave:{  
        color:'#7B7D7D', 
        fontWeight:'normal',
        fontSize:30,
        alignSelf:'center'
    },
});
export default Update;
