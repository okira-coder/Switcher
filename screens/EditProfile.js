import React,{useCallback,useRef,useState, useEffect} from 'react';
import SafeViewAndroid from '../component/SafeViewAndroid';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image,Switch,Linking,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {dominantColor , lightNeutralColor, DarkNeutralColor,
     closeButtonColor,acceptButtonColor, refuseButtonColor, blackTextColor,backgroundcolor, whiteTextColor, text1, text2, text3} from '../component/ColorComponent'
import { LineComponent } from '../component/LineComponent';
import client from '../api/client';
import socket from '../api/socket';
import { setInvisible, setQuickSwitch } from '../models/SwitchContraint';
import ShowNetworks from '../component/ShowNetworks'
function EditProfile({props,user}){
    const { navigate } = useNavigation();
    const {token} = props.route.params
    const name = user.name;
    const pseudo = user.pseudo;
    const bio =user.bio;
    const displayBio = bio.substr(0,20)+'...'
    const networks = user.networks.split(" ");
    
    const [refresh,setRefresh] = useState(false);
    const refreshComponent = () => setRefresh(()=> !refresh)

    const [switchSound, setSound] = useState(true);
    const [quickSwitch, setSwitch] = useState(false);
    const [switchMode, setMode] = useState(false);
    useEffect(()=>{
        user
    },[refresh])

    const toggleSound = (value)=>{
        setSound(value);
    }
    const buttonAlertQuickSwitch = (value) =>
    Alert.alert(
        "Enable quickSwitch?",
        "If you enable QuickSwitch, you will automatically switch with switchers that are within 3 cm of you",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () =>{ setQuickSwitch(1); ;setSwitch(value)} }
        ]
      );
    const toggleSwitch = (value)=>{
        if(value) {buttonAlertQuickSwitch(value)}
        else{ setQuickSwitch(0);setSwitch(value);};
        
    }
    const buttonAlertMode = (value) =>
    Alert.alert(
        "Are you sure !!!",
        "if you become invisible, the switchers around you will not see you and you will not see them either",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () =>{ setInvisible(1); ;setMode(value)} }
        ]
      );
    const toggleMode = (value)=>{
        if(value) {buttonAlertMode(value)}
        else{ setInvisible(0);setMode(value)};
    }
    const notifications = useCallback(() => {
        refreshComponent()
        navigate('Notifications');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
    const logout = async ()=>{
        try {
            await client.post('/logout',{},
            {
              headers: {
                    Accept: 'application/json',
                    session : `JWT ${token}`,
                 }
              }
          ).then((res)=>{
              if(res.data.success){
                  user.usersNears = [];
                  user. usersAround = [];
                socket.disconnect();
                  props.navigation.dispatch(
                      StackActions.replace('Welcome', {
                      })
                    );

              }
              else{
              console.log('Logout res.data:', res.data.message);
            }
            
          })
          } catch (error) {
            console.log('erreur',error.message)
          }
    }
    
    return(
        <SafeAreaView  style={[SafeViewAndroid.droidSafeArea,{backgroundColor:blackTextColor}]}>
            <ScrollView nestedScrollEnabled={true}  style={[{padding:10}]}>

            <View style={{ alignItems: 'center',justifyContent: 'center',}}>
            <Text style={{color:whiteTextColor, fontSize:24,fontWeight:'bold'}}>{name}</Text> 
                <TouchableOpacity onPress={useCallback(() => {navigate('UpdateImage');}, [])}>
                <LinearGradient
          colors={['#000000', '#000000']}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{ height: 105, width: 105, alignItems: 'center', justifyContent: 'center',borderRadius:100,
        }}
        >
            <View style={[styles.profil]}>
                    <Image source={{uri: user.img}} style={styles.profilImage}/>
                    </View>
        </LinearGradient>
                    
                </TouchableOpacity>   
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:whiteTextColor, fontSize:24,padding:10, marginLeft:10,fontWeight:'100'}}>@{pseudo}</Text>
                    <TouchableOpacity onPress={notifications}>
                        <View style={{flexDirection:'row'}}>
                            <MaterialIcons name="notifications-active" size={30} color='#FFD728' style={{ marginRight:-20,alignSelf:'center'}}/>
                            <View style={{borderRadius:50,backgroundColor:'red',height:16,width:16,marginLeft:5,}}>
                                <Text style={{borderRadius:50,color:'white', fontWeight:'bold', fontSize:13, alignSelf:'center'}}>{user.notif}</Text>  
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={notifications}>
                
                <View style={{flexDirection:'row',backgroundColor:blackTextColor,width:150,height:40,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    
                        <Text style={[styles.textStyle,{fontWeight:'bold', color:'#d1001c',fontSize:20, paddingRight:10}]}>{user.switches.length}</Text>
                        <Text style={[styles.textStyle,{fontSize:20, color:'#008080',fontWeight:'300'}]}>Switches</Text>
                </View>
            </TouchableOpacity>  
            </View>
            
             
            <View style={{paddingTop:20,paddingRight:10}}>
                <Text style={{color:'#00597f',  fontSize:14, paddingBottom:20,}}>About Me </Text>
                <TouchableOpacity onPress={useCallback(() => {navigate('Name');}, [])}>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:30}}>
                        <Text style={[styles.textStyle,{fontWeight:'200'}]}>Name</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle, {marginRight:10}]}>{name}</Text>
                            <Feather name="chevrons-right" size={20} color='#008080' />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={useCallback(() => {navigate('Pseudo');}, [])}>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:30}}>
                        <Text style={[styles.textStyle,{fontWeight:'200'}]}>Username</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle, {marginRight:10}]}>{pseudo}</Text>
                            <Feather name="chevrons-right" size={20} color='#008080' />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={useCallback(() => {navigate('Bio');}, [])}>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:30}}>
                        <Text style={[styles.textStyle,{fontWeight:'200'}]}>Bio</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle, {marginRight:10}]} numberOfLines={1} ellipsizeMode="tail">
                                {displayBio}
                            </Text>
                            <Feather name="chevrons-right" size={20} color='#008080' />
                        </View>
                    </View>
                </TouchableOpacity>
                
                <LineComponent />   
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={useCallback(() => {navigate('UpdateNetworks');}, [])}>
                    <View style={{ paddingBottom:20,flexDirection:'row',justifyContent:'space-between',paddingRight:10}}>
                        <Text style={{color:'#c32aa3', fontSize:14,fontWeight:'300'}}>Social Media</Text>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:dominantColor, fontSize:14,fontWeight:'100'}}>Update</Text>
                            <Feather name="chevrons-right" size={20} color='#008080' />
                        </View>
                    </View>
                </TouchableOpacity>
                
                <ShowNetworks networks={networks} />
            </View>
            <LineComponent />
            <TouchableOpacity onPress={useCallback(() => {navigate('Password');}, [])}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:20, paddingBottom:20,paddingRight:10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcons name="lock-outline" size={20} color="gray" />
                        <Text style={[styles.textStyle, {color:'gray'}]} >Change Password</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.textStyle,{color:'#fff'}]}>••••••••</Text>
                        <Feather name="chevrons-right" size={20} color='#008080' />
                    </View>
                </View>
            </TouchableOpacity>
            <LineComponent />

            <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:20,paddingRight:10}}>
                <View style={{flexDirection:'row',}}>
                <AntDesign name="sound" size={20} color='#7cf701' style={{marginRight:5}}/>
                <Text style={[styles.textStyle, {color:whiteTextColor,opacity:.5}]}>Sounds</Text>
                </View>
                <Switch 
                trackColor={{ false: "#767577", true: text2 }}
                ios_backgroundColor={text3} 
                onValueChange={toggleSound} value={switchSound}
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
            </View>
            <LineComponent />
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:20,paddingRight:10}}>
                <View style={{flexDirection:'row',}}>
                    <MaterialIcons name="connect-without-contact" size={20}  color='orange' style={{marginRight:5}}/>
                    <Text style={[styles.textStyle, {color:whiteTextColor,opacity:.5}]}>Quick switch</Text>
                </View>
                <Switch 
                trackColor={{ false: "#767577", true: text2 }}
                ios_backgroundColor={text3} 
                onValueChange={toggleSwitch} value={quickSwitch}
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
            </View>
            <LineComponent />

            <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:20,paddingRight:10}}>
                <View style={{flexDirection:'row',}}>
                <FontAwesome5 name="users-slash" size={20} color={text1}  style={{marginRight:5}}/>
                <Text style={[styles.textStyle, {color:whiteTextColor,opacity:.5}]}>Be invisible</Text>
                </View>
                <Switch 
                trackColor={{ false: "#767577", true: text2 }}
                ios_backgroundColor={text3} 
                onValueChange={toggleMode} value={switchMode}
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
                
            </View>
            <LineComponent />

            <TouchableOpacity onPress={()=>{logout()}}>
                <View style={{flexDirection:'row',paddingTop:20,}}>
                    <AntDesign name="logout" size={20} color='#ea0b02' style={{marginRight:5}}/>
                    <Text style={[styles.textStyle, {color:whiteTextColor,opacity:.5}]}>Log out</Text>
                </View>

            </TouchableOpacity>
            <View style={{paddingTop:90, alignItems:'center'}}>
                <TouchableOpacity>
                    <Text style={[styles.textStyle,{color:dominantColor, }]}>
                        Terms of use & Privacy Policy
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    keyboard:{
        flex: 1,
    },
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
      },
      profilImage:{
        width:100,
        height:100,
        borderRadius:50,
        
        
        
    },
    profil:{
        paddingTop:10,
        padding:10,
       
    },
    textStyle:{
        color:whiteTextColor,
        fontSize:16
    },
    media:{
        height:50,
        width:50,
        marginRight:20
    }
});
export default EditProfile;
