import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import UploadProgress from '../component/UploadProgress';
import { Ionicons } from '@expo/vector-icons';


 function UpdateImage({token,user}){
    const navigation = useNavigation();
     const [profileImage, setProfileImage] = useState('')
     const [saving, changeSaving] = useState(0);
     
     const [progress, setProgress] = useState(0)
     const openImageLibrary = async()=>{
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if(status !== 'granted'){alert('Sorry, we need camera roll permissions to make this work');}
        if(status === 'granted'){
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true
            })
            if(!response.cancelled){
                setProfileImage(response.uri)
            }
        }
     }
     const uploadProfileImage = async() =>{
        const formData =  new FormData();
        formData.append('profile',{
            name: new Date() + '_profile',
            uri: profileImage,
            type: 'image/jpg'
        })
        try{
            await client.post('/upload-profile',formData, {
             headers: {
                 Accept: 'application/json',
                 'content-Type': 'multipart/form-data',
                 session : `JWT ${token}`,
                },
                onUploadProgress: ({loaded,total}) => setProgress(loaded/total)

             }
         ).then((res)=>{
            console.log(res.data);
          if(res.data.success){
                user.img = profileImage;
                changeSaving(1);
                setTimeout(()=>{changeSaving(0)},3000)
          }
         })
         
        }catch(error){
            console.log(error)
        }

     }
  return(
      <>
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
             }} style={[{alignSelf:'center'}]} >
                <Ionicons name="chevron-back" size={30} color="gray" style={[styles.icon,{alignSelf:'center'}]} />
            </TouchableOpacity>
            
            <Text style={{color:'white', fontSize:20,alignSelf:'center'}}>Image</Text>
            <View>
                {profileImage ? (<Text onPress={uploadProfileImage} style={styles.next}>Done</Text> ):null}
            </View>
        </View>
        <View style={{paddingTop:10}}>
            {saving==1 ? <Text style={styles.textSave}>Saved !</Text>:null}
        </View>
      <View style={{alignItems:'center', justifyContent:'center', paddingTop:Dimensions.get('window').height/6}}>
      <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtn}>
           {profileImage ? <Image source={{uri: profileImage}} style ={{width: '100%', height: '100%'}} />
           :<Image source={{uri: user.img}} style ={{width: '100%', height: '100%'}}/>
        }
        </TouchableOpacity>
        <Text style={styles.uploadContent}>Upload profile picture</Text>
        {/* {progress?<Text style={{color:"#FFF"}}>{progress}</Text> : null} */}
        </View>
    </View>
    {/*progress ? <UploadProgress process={progress} />:null*/}    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    
    
  },
  textSave:{  
    color:'#008080', 
    fontWeight:'normal',
    fontSize:30,
    alignSelf:'center'
},
  icon:{
    width:30,
    height:30,
    //paddingLeft:5,
},
profilImage:{
    width:100,
    height:100,
    borderRadius:50,
},
  uploadBtn:{
      height:300,
      width:300,
      borderRadius: 300/2 ,
      justifyContent: 'center',
      alignItems:'center',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor:'#fff',
      overflow: 'hidden'
  },
  uploadContent:{
    color:'#fff',
    textAlign: 'center',
   fontSize:16,
   //opacity: 0.3,
   fontWeight: 'bold'
    },
    next:{
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color : '#fff'
    }
});

export default UpdateImage;
