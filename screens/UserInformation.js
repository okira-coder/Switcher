import React,{useCallback,useRef,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image,Switch,Linking} from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { LineComponent } from '../component/LineComponent';
import { GetStreet } from '../models/GetStreet';


const SPACING = 20;
const AVATAR_SIZE = 45;
const ITEM_SIZE = AVATAR_SIZE + SPACING *3;
const widthWindow = Dimensions.get('window').width;
function UserInformation(props){

    const{item,date} =props.route.params
    const navigation = useNavigation();
    const { navigate } = useNavigation();
    const name = item.name;
    console.log('name dans userInformation', name)
    const pseudo = item.pseudo;
    const bio =item.bio;
    const networks = item.networks.split(" ");
    const openNetwork = async (network) => {
        console.log('just a test', network)
        const supported = await Linking.canOpenURL(network)
        if (supported) {
          await Linking.openURL(network);
        } else {
          alert(`Don't know how to open this URL: ${network}`);
        } 
    }

    const [switchValue, setSwitch] = useState(true);
    const [selectNotification, setNotification] = useState(false);
    const toggleSwitch = (value)=>{
        setSwitch(value);
    }
    const notifications = useCallback(() => {
        navigate('Notifications');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      function isNumeric(val) {
        return /^-?\d+$/.test(val.trim());
    }  
    
    return(
        <SafeAreaView  style={{backgroundColor:'#000000',flex:1}}>
            <View style={{padding:10}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                    
                    <Ionicons name="chevron-back" size={30} color="gray" style={styles.icon} />
                    
                    </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center',justifyContent: 'center',}}>

            
                    <Text style={{color:'#fff', fontSize:22, alignSelf:'center'}}>{name}</Text> 
                    <View style={[styles.profil]}>
                    <Image source={{uri: item.img}} style={styles.profilImage}/>
                    </View>
                    <Text style={{color:'#fff', fontSize:22,padding:10, marginLeft:10}}>{pseudo}</Text>
                    <Text style={[styles.textStyle, {color:'#fff', fontWeight:'300'}]} >{bio}</Text>

                 
            </View>
             
            <View style={{paddingTop:50}}>
                <Text style={{color:'#00597f',  fontSize:14, paddingBottom:20,fontWeight:'300'}}>Information </Text>
                
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/location.png')} style={[styles.icon,{alignSelf:'center',}]}/>
                    <Text style={[styles.textStyle, {color:'#696969', alignSelf:'center',paddingLeft:10}]} >{GetStreet}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                <AntDesign name="calendar" size={24} color="#008080"  style={[styles.icon,{alignSelf:'center',}]}/>
                    <Text style={[styles.textStyle, {color:'#696969', alignSelf:'center',lineHeight: 16,paddingLeft:10}]} >{date}</Text>
                </View>

               <LineComponent />    
            </View>
            <View style={{paddingTop:10}}>
                        <Text style={{color:'#c32aa3', fontSize:14,fontWeight:'300',paddingBottom:10}}>Social Media</Text>
                                    
                <View style={{flexDirection:'row',justifyContent:'space-between', paddingTop:10}}>
                        <View style={{flexDirection:'row',}}>
                            {
                                networks.map((network) => {
                                    if(network !==''){
                                        if(network.indexOf('instagram.com')>=0){
                                            const insta = network.trim();
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(insta)}}>
                                        <Image source={require('../assets/instagram.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('tiktok.com')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/tiktok.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('snapchat.com')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/snapchat.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('facebook.com')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/facebook.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('//pin.it/')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/pinterest.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('//t.me/')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/telegram.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('www.linkedin.com')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/linkedin.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('youtube.com')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/youtube.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(network.indexOf('twitch.tv')>=0){
                                        return (
                                      <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/twitch.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }
                                    else if(isNumeric(network)){
                                        const number=network.trim();
                                        return (
                                      <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${number}`)}}>
                                        <Image source={require('../assets/whatsapp.png')} style={styles.media} />
                                      </TouchableOpacity>
                                        );
                                    }else{
                                        return (
                                            <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                              <Image source={require('../assets/reddit.png')} style={styles.media} />
                                            </TouchableOpacity>
                                              );
                                    }
                                    }
                                    
                                  })
                            }
                        </View>
                        
                    </View>
            </View>
            </View >
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    media:{
        height:50,
        width:50,
        marginRight:20
    },
    container: {
        flex: 1,
        backgroundColor:'#000000'
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
        color:'#fff',
        fontSize:16
    },
    icon:{
        width:25,
        height:25
    },
  
});
export default UserInformation;