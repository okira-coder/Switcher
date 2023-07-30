import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';


 function ImageUpload(props){
    const {token} = props.route.params
     const [profileImage, setProfileImage] = useState('')
     //const [progress, setProgress] = useState(0)
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
                }
             }
         ).then((res)=>{
            console.log(res.data);
            console.log("Token dans networks: ", {token})
          if(res.data.success){
              props.navigation.dispatch(
                  StackActions.replace('Networks', {
                    token: token,
                  })
                );
          }
         })
         
        }catch(error){
            console.log(error)
        }

     }
  return(
    <View style={styles.container}>
      <View>
      <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtn}>
           {profileImage ? <Image source={{uri: profileImage}} style ={{width: '100%', height: '100%'}} />
           : <Text style={styles.uploadContent}>Upload profile picture</Text>}
        </TouchableOpacity>
        {/* {progress?<Text style={{color:"#FFF"}}>{progress}</Text> : null} */}
        {profileImage ? (<Text onPress={uploadProfileImage} style={styles.next}>Next</Text> ):null}
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadBtn:{
      height:150,
      width:150,
      borderRadius: 150/2 ,
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
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
        opacity: 0.5,
        color : '#00FFFF'
    }
});

export default ImageUpload;
