import * as React from 'react';
import ShowMore from 'react-native-show-more-button';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, ScrollView,TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState,useCallback, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import client from '../api/client';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import UserAroundModal from '../component/UserAroundModal';
import Modal  from 'react-native-modal';
import moment from 'moment';
import socket from '../api/socket';
import { contraintsBeforeSwitch,waitingContraint } from '../models/SwitchFunctions';
import ShowUserNetworks from '../component/ShowUserNetworks';
import ShowInfo from '../component/ShowInfo';
const { width, height } = Dimensions.get('window');




const SPACING = 20;
const AVATAR_SIZE = 45;
const ITEM_SIZE = AVATAR_SIZE + SPACING *3;
const dim = Dimensions.get('window');

function Notifications({props,token,user,socketRef}) {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const [waiting,setWaiting] = useState(user.waiting);
    const [switches,setSwitches] = useState(user.switches);
    let leftHeaderTranslateX = 40;
    let rightHeaderOpacity = 0;
    let rightHeaderTranslateY = -20;
    let loginColorInterpolate = '#008080';
    let signupColorInterpolate = '#000000';
    let lineColor1 = 'white';
    let lineColor2 = '#696969';
    let lineWidth1 = 2;
    let lineWidth2 = 1;
    let notif = 'black';
    let notifView = '#990000';
    let [selectItem, setItem] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const refreshComponent = () => setRefresh(()=> !refresh)
    useEffect(()=>{
        user;
        user.notif = user.waiting.length;
    },[refresh])

     const animation = useRef(new Animated.Value(0)).current
      rightHeaderOpacity = animation.interpolate({
         inputRange: [0,width],
         outputRange: [1, 0]
     })
      leftHeaderTranslateX = animation.interpolate({
        inputRange: [0,width],
        outputRange: [0, 40]
    })
    rightHeaderTranslateY = animation.interpolate({
        inputRange: [0,width],
        outputRange: [0, -20]
    })
    loginColorInterpolate = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['#fff', 'gray']
    })
    signupColorInterpolate = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['gray', '#fff']
    })
    notif = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['black', 'white']
    })
    notifView = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['#990000', 'gray']
    })
    lineColor1 = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['white', '#696969']
    })
    lineColor2 = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['#696969', 'white']
    })
    lineWidth1 = animation.interpolate({
        inputRange: [0,width],
        outputRange: [2, 1]
    })
    lineWidth2 = animation.interpolate({
        inputRange: [0,width],
        outputRange: [1, 2]
    })
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const deleteItem = (itemKey)=>{
        console.log('item: ',itemKey)
        setModalVisible(false);
        const filteredData = waiting.filter((item) => {return item.dataUser.pseudo !== itemKey})
        console.log('filter lentgh', filteredData.length);
        user.waiting = filteredData;
        setWaiting(filteredData);
        user.notif =  user.waiting.length;
    }
    
    const addItem = (item)=>{
        console.log('additem',item.dataUser.pseudo)
        const switchers = user.switches.concat(item);
        user.switches = switchers
        setSwitches(user.switches);
        deleteItem(item.dataUser.pseudo);
    }
    const switcher = (item)=>{
        const constraint = contraintsBeforeSwitch(user,item)
        if(constraint === 1){
            addItem(item);
            socketRef.current.emit('switch',{item,user});
        }
        
    }
        
    useEffect(()=>{
        setSwitches(user.switches)
    },[user.switches])
    const scrollA = useRef(new Animated.Value(0)).current;
    const ShowInfo = useCallback(()=>{
        return(
                    <View style={[styles.modalView, ]}>
                       <View style={{width:dim.width/1.1,height:dim.height/1.92,justifyContent:'stretch',
        }}>
                            <ScrollView contentContainerStyle={{ 
            
            
            
            }}>
                   <Image source={[{uri: selectItem.dataUser.img}]}
                     
                     style={{width: dim.width/1.1, height: dim.width/1.1,
                      borderRadius:20, marginBottom:5,}}/>
                     
                         <View style={{justifyContent:'center',alignItems:'center',margin:5,}}>
                     <Text style={{fontSize:25,color:'#fff',fontWeight:'bold'}}>{selectItem.dataUser.name}</Text>
                     <Text style={{fontSize:20,color:'#fff', fontWeight:'300',paddingBottom:10,}}>@{selectItem.dataUser.pseudo}</Text>
                     <View style={{height:dim.width/1.1,width:dim.width/1.1,alignItems:'center', backgroundColor:'rgba(225, 225, 225, .5)',borderTopLeftRadius:20,borderTopRightRadius:20,justifyContent:'space-between'}}>
                         <Text style={{margin:5,fontSize:16,color:'#000',marginBottom:15, }}>{selectItem.dataUser.bio}</Text>
                         <View style={{marginBottom:15}}>
                            <ShowUserNetworks userNetworks={selectItem.dataUser.networks} />
                         </View>
                     </View>
                     </View>
                   
                            </ScrollView>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:55}}>
                      <TouchableOpacity onPress={()=>{deleteItem(selectItem.dataUser.pseudo)}}><Fontisto name="close" size={45} color="#FF6F91" style={{marginRight:30}}/></TouchableOpacity>
                        <TouchableOpacity onPress={() => {switcher(selectItem)}}><MaterialCommunityIcons name="target-account" size={50} color="#00FFFF" style={{marginLeft:30}}/></TouchableOpacity>
                     </View>
                </View>
                
                )
                    
  
    },[selectItem])
    const getUserInfo = (userInfo)=>{
        const date = moment()
      .utcOffset('+02:00')
      .format('DD MMM YYYY HH:mm:ss');

        const item = userInfo.dataUser
        navigate('UserInformation',{item,date})
    }

    
   
  return( 
    <View style={[styles.container]} >
        <View style={{flexDirection:'row',paddingTop:20,}}>
            <TouchableOpacity onPress={() => {
        refreshComponent();
        navigation.goBack();
      }}>
                <View style={{flexDirection:'row',paddingRight:width/5}}>
                <Ionicons name="chevron-back" size={24} color="gray" style={styles.icon} />
                    <Text style={{color:'gray', alignSelf:'center', fontSize:20, fontWeight:'200'}}>Back</Text>
                </View>
            </TouchableOpacity>
         
            <Text style={{alignSelf:'center', fontSize:20, color:'#fff'}}>Notifications</Text>
                
        </View> 
        <View  style={{ flexDirection:'row', justifyContent:'space-around',paddingTop:30, height:80 }}>
            <View >
                <TouchableWithoutFeedback >
                    <Animated.Text style={[styles.login,{color:loginColorInterpolate}]}>Switches</Animated.Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={{justifyContent:'center'}}>
                <TouchableWithoutFeedback >
                    <View style={{flexDirection:'row', }}>
                        <Animated.Text style={[styles.login,{color:signupColorInterpolate}]}>Waiting</Animated.Text>
                        {waiting.length>0?<Animated.View style={{borderRadius:50,backgroundColor:notifView,height:18,width:18,alignItems:'center', marginLeft:-5}}>
                            <Animated.Text style={{borderRadius:50,color:notif, fontWeight:'bold', fontSize:13, }}>{waiting.length}</Animated.Text>   
                        </Animated.View>:null}
            </View>
                    
                </TouchableWithoutFeedback>
            </View>
            
            
        </View>
        <View style={{paddingLeft:10,paddingRight:5,flexDirection:'row'}}>
                    <Animated.View style={{borderBottomColor: lineColor1,borderBottomWidth: lineWidth1,width:Dimensions.get('window').width/2}}>    
                    </Animated.View>
                    <Animated.View style={{borderBottomColor: lineColor2,borderBottomWidth: lineWidth2,width:Dimensions.get('window').width/2}}>    
                    </Animated.View>
        </View>
        <ScrollView style={styles.ScrollViewStyle} horizontal pagingEnabled showsHorizontalScrollIndicator = {false} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {x:animation}}}], {useNativeDriver:false})}> 
        <View style={styles.scrollComponent} >
        
        <Animated.FlatList 
                        data={user.switches.reverse()}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y:scrollY}}}],
                            {useNativeDriver: true}
                        )}
                        keyExtractor={item=>item.dataUser.pseudo}
                        
                        renderItem={({item, index})=>{
                            const inputRange =[
                                -1,
                                0,
                                ITEM_SIZE * index,
                                ITEM_SIZE * (index+2)
                            ]
                            const opacityinputRange =[
                                -1,
                                0,
                                ITEM_SIZE * index,
                                ITEM_SIZE * (index+1)
                            ]
                            const scale = scrollY.interpolate({
                                inputRange,
                                outputRange:[1,1,1,0]
                            })

                            const opacity = scrollY.interpolate({
                                inputRange: opacityinputRange,
                                outputRange:[1,1,1,0]
                            })

                            return (<Animated.View style={{flexDirection: 'row', padding: SPACING, paddingTop:10, marginBottom:1, backgroundColor:'#000000',
                             //borderRadius: 16,
                             shadowColor:"#000",
                             shadowOffset:{
                                 width: 0,
                                 height:10
                             },
                             shadowOpacity: .3,
                             shadowRadius: 20,
                             opacity,
                             transform: [{scale}]
                             }}>
                                 <TouchableOpacity
                                 style={{flexDirection: 'row',paddingTop:10, marginBottom:1, backgroundColor:'#000000',width:Dimensions.get('window').width
                                }}
                                onPress={()=>{getUserInfo(item)}}
                                 >
                                    <Image
                                    source={{uri: item.dataUser.img}}
                                    style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius:AVATAR_SIZE,
                                    marginRight: SPACING/2
                                    }}
                                    />
                                    <View>
                                        <Text style={{fontSize:16, fontWeight:'700', color:'#fff'}}>{item.dataUser.name}</Text>
                                        <Text style={{fontSize:14, opacity: .7, color:'#fff'}}>{item.dataUser.pseudo}</Text>
                                        <Text style={{fontSize:12, opacity: .8, color:'#fff',width:Dimensions.get('window').width/1.3}} numberOfLines={1} ellipsizeMode="tail">{item.dataUser.bio}</Text>
                                    </View>   
                                 </TouchableOpacity>
                                
                            </Animated.View>)
                        }}
                    />
        </View>
        <View style={styles.scrollComponent} >
        <Animated.FlatList 
                        data={user.waiting.reverse()}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y:scrollY}}}],
                            {useNativeDriver: true}
                        )}
                        keyExtractor={item=>item.dataUser.pseudo}
                        
                        renderItem={({item, index})=>{
                            const inputRange =[
                                -1,
                                0,
                                ITEM_SIZE * index,
                                ITEM_SIZE * (index+2)
                            ]
                            const opacityinputRange =[
                                -1,
                                0,
                                ITEM_SIZE * index,
                                ITEM_SIZE * (index+1)
                            ]
                            const scale = scrollY.interpolate({
                                inputRange,
                                outputRange:[1,1,1,0]
                            })

                            const opacity = scrollY.interpolate({
                                inputRange: opacityinputRange,
                                outputRange:[1,1,1,0]
                            })

                            return (
                            
                            <Animated.View style={{flexDirection: 'row', padding: SPACING,paddingTop:10, marginBottom:1, backgroundColor:'#000000',
                             //borderRadius: 16,
                             shadowColor:"#000",
                             shadowOffset:{
                                 width: 0,
                                 height:10
                             },
                             shadowOpacity: .3,
                             shadowRadius: 20,
                             opacity,
                             transform: [{scale}]
                             }}>
                                
                <TouchableOpacity
                style={{flexDirection: 'row',paddingTop:10, marginBottom:1, backgroundColor:'#000000',width:Dimensions.get('window').width
            }}
                    onPress={() => {setItem(item);setModalVisible(true);}}
                >
                    <Image source={{uri: item.dataUser.img}}
                    resizeMode='cover'
                    blurRadius={5}
                    style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius:AVATAR_SIZE,marginRight: SPACING/2}}/>
                        <View>
                        <Text style={{fontSize:16, fontWeight:'700', color:'#fff'}}>{item.dataUser.name}</Text>
                                        <Text style={{fontSize:14, opacity: .7, color:'#fff'}}>{item.dataUser.pseudo}</Text>
                            <Text style={{fontSize:12, opacity: .8, color:'#fff',width:Dimensions.get('window').width/1.3}} numberOfLines={1} ellipsizeMode="tail">{item.dataUser.bio}</Text>
                        </View>
                </TouchableOpacity>
      
    
                    </Animated.View>)
                        }}
                    />
        </View>
        </ScrollView>
        <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <ShowInfo  />
                </Modal>
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'center',
    backgroundColor:'#000000'
  },
  header:{
    backgroundColor:'#000000',
    height:45,
    width:Dimensions.get('window').width/2,
},
    icon:{
        width:20,
        height:25
    },
    verticleLine: {
        height: '50%',
        width: 1,
        backgroundColor: '#909090',
        alignSelf:'center'
      },

    login:{
        color: 'white', 
        fontSize: 20,
        alignSelf:'center',
        marginTop:15,
        
    },
    buttonStyle :{
        height: 45,
        width: '50%',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 20,
    },
    
    borderRight:{
        borderTopRightRadius:'50%',
        borderBottomRightRadius:'50%',
        //
    },
    scrollComponent:{
        justifyContent: 'center',
        //alignItems:'center',
        width:Dimensions.get('window').width,
        backgroundColor:'#262525',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        with:Dimensions.get('window').width,
        height:Dimensions.get('window').height
      },
      modalView: {
        width:dim.width/1.1,
        height:dim.height/1.7,
        backgroundColor: "#000",
        borderRadius: 16,
        marginTop:99,
        paddingRight:50,
        shadowColor:'#00FFFF',
        shadowOffset:{
          width:0,
          height:1
        }  ,
        shadowOpacity:.5,
        shadowRadius:3.22,
        elevation:3 
      },
      
    
});
export default Notifications