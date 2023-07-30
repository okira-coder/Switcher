import React,{useCallback,useRef,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image,Switch} from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
function UserProfile(){

    const Bio ="Hey,let's switch"
    const [switchValue, setSwitch] = useState(true);
    const toggleSwitch = (value)=>{
        setSwitch(value);
    }
    
    return(
        <SafeAreaView >
            <View style={{ alignItems: 'center',justifyContent: 'center',}}>
            <Text style={{color:'#fff', fontSize:22}}>Franck ARIKO</Text> 
                <TouchableOpacity>
                    <View style={[styles.profil]}>
                        <Image source={require('../assets/reddit.png')} style={styles.profilImage}/>
                    </View>
                </TouchableOpacity>   
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff', fontSize:22,padding:10, marginLeft:10}}>@pseudo</Text>
                    <TouchableOpacity onPress={notifications}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../assets/notification.png')} style={{width:50,height:50, marginRight:-15}} /> 
                            <View style={{borderRadius:50,backgroundColor:'red',height:16,width:16}}>
                                <Text style={{borderRadius:50,color:'white', fontWeight:'bold', fontSize:13, alignSelf:'center'}}>3</Text>   
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>   
            </View>
            <View style={{paddingTop:20}}>
                <Text style={{color:'#84D7C6', paddingLeft:10, fontSize:14, paddingBottom:20}}>About Me </Text>
                <TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:30}}>
                        <Text style={[styles.textStyle,{paddingLeft:10}]}>Name</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle, {marginRight:10}]}>Franck ARIKO</Text>
                            <Image source={require('../assets/next.png')} style={{width:20,height:20}} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:30}}>
                        <Text style={[styles.textStyle,{paddingLeft:10}]}>Username</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle, {marginRight:10}]}>__frantz_</Text>
                            <Image source={require('../assets/next.png')} style={{width:20,height:20}} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:30}}>
                        <Text style={[styles.textStyle,{paddingLeft:10}]}>Bio</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle, {marginRight:10}]} numberOfLines={1} ellipsizeMode="tail">
                                Hey,let's switch
                                {Bio.length>16?<Text>...</Text>:null}
                            </Text>
                            <Image source={require('../assets/next.png')} style={{width:20,height:20}} />
                        </View>
                    </View>
                </TouchableOpacity>
                
                <View style={{paddingLeft:10,paddingRight:5,paddingBottom:20}}>
                    <View style={{borderBottomColor: '#696969',borderBottomWidth: 1,}}>    
                    </View>
                </View>    
            </View>
            <View style={{paddingLeft:10}}>
                <Text style={{color:'#84D7C6', fontSize:14, paddingBottom:20}}>Social Media</Text>
                <TouchableOpacity>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',}}>
                            <Image source={require('../assets/instagram.png')} style={styles.media} />
                            <Image source={require('../assets/tiktok.png')} style={styles.media} />
                            <Image source={require('../assets/snapchat.png')} style={styles.media} />
                        </View>
                        <View style={{marginBottom:30}}>
                            <Image source={require('../assets/next.png')} style={{width:20,height:20}} />
                        </View>
                    </View>
                </TouchableOpacity> 
            </View>
            <TouchableOpacity>
                <View style={{flexDirection:'row',paddingLeft:10, justifyContent:'space-between', paddingTop:60}}>
                    <Text style={[styles.textStyle, {color:'#696969'}]} >Change Password</Text>
                    <Image source={require('../assets/next.png')} style={{width:16,height:16}} />
                </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',paddingLeft:10, justifyContent:'space-between', paddingTop:30}}>
                <View style={{flexDirection:'row',}}>
                    <Image source={require('../assets/sound.png')} style={{width:20,height:20,marginRight:10}} />
                    <Text style={[styles.textStyle, {color:'#696969'}]}>Sounds</Text>
                </View>
                <Switch 
                trackColor={{ false: "#767577", true: "#84D7C6" }}
                ios_backgroundColor="#3e3e3e" 
                onValueChange={toggleSwitch} value={switchValue}
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
                
            </View>
            <View style={{paddingTop:120, alignItems:'center'}}>
                <TouchableOpacity>
                    <Text style={[styles.textStyle,{color:'#84D7C6', fontWeight:'100'}]}>
                        Terms of use & Privacy Policy
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    media:{
        height:50,
        width:50,
        marginRight:20
    }
});
export default UserProfile;
