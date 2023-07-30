import * as React from 'react';
import {Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity,  SafeAreaView, ScrollView,Button,} from 'react-native';
import SafeViewAndroid from '../component/SafeViewAndroid';
import { useRef, useState, useEffect,useCallback } from 'react';
import {createStackNavigator,} from '@react-navigation/stack';
import { useHeaderHeight } from '@react-navigation/elements';
import Modal  from 'react-native-modal';
import {MotiView} from '@motify/components'
import { Easing } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import EditProfile from './EditProfile';
import Notifications from './Notifications';
import Update from './Update';
import UpdatePassword from './UpdatePassword';
import UpdateImage from './UpdateImage';
import UpdateNetworks from './UpdateNetworks';
import UserInformation from './UserInformation'
import socket from '../api/socket';
import SetPos from './SetPos';
import {addUserAround,removeUserAround,findOne,} from '../models/UsersAround'
import {addSwitcher,contraintsBeforeSwitch,waitingContraint} from '../models/SwitchFunctions'
import { usersNear } from '../models/UsersAround';
import {dominantColor , lightNeutralColor, DarkNeutralColor,
  closeButtonColor,acceptButtonColor, refuseButtonColor, whiteTextColor, buttonColor, blackTextColor, text2, text1} from '../component/ColorComponent'

import ShowUserNetworks from '../component/ShowUserNetworks';
import ShowInfo from '../component/ShowInfo';
const SPACING = 20;
const AVATAR_SIZE = 60;
const ITEM_SIZE = AVATAR_SIZE + SPACING *3;
const dim = Dimensions.get('window');
const Stack = createStackNavigator();
function Navigator({props, token,user,socketRef}){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name='EditProfile'>
        {() => {return <EditProfile props={props}  user={user} waiting={user.waiting}/>}}
      </Stack.Screen>
      <Stack.Screen  name='Notifications' >
          {() => <Notifications props={props} token={token} user={user} socketRef={socketRef} />}
      </Stack.Screen>
      <Stack.Screen  name='Name' >
          {() => <Update name='Name' content={user.name} token={token} user={user}/>}
      </Stack.Screen>
      <Stack.Screen  name='Pseudo' >
      {() => <Update name='Pseudo' content={user.pseudo}  token={token} user={user}/>}
      </Stack.Screen>
      <Stack.Screen  name='Bio' >
      {() => <Update name='Bio' content={user.bio} token={token} user={user}/>}
      </Stack.Screen>
      <Stack.Screen name='Password' >
      {() => <UpdatePassword token={token}/>}
      </Stack.Screen>
      <Stack.Screen  name='UpdateImage'>
      {() => <UpdateImage name='UpdateImage' token={token} user={user}/>}
      </Stack.Screen>
      <Stack.Screen  name='UpdateNetworks'>
      {() => <UpdateNetworks name='UpdateNetworks' token={token} user={user}/>}
      </Stack.Screen>
      
      <Stack.Screen name="UserInformation" component={UserInformation} />
    </Stack.Navigator>
  );
}
function Main(props){

    const sheetRef = useRef(null);
    const socketRef = useRef();
    let colorAnime = '#000';

    const [isOpen, setIsOpen] = useState(true);
    const snapPoints = ["90%"];
    const handleClosePress = () =>{ sheetRef.current.close();refreshComponent()}
    const headerHeight = useHeaderHeight();
    let index = 0;
  let {token,user} = props.route.params;
 
  const [usersAround, setUsersAround] = useState(usersNear);
  const [effect,setEffect] = useState(false);
  const [tap,setTap] = useState(1);
  const [myTimeout, setMyTimeout] = useState(null);
  const [refresh,setRefresh] = useState(false);
  useEffect(()=>{
    console.log('refresh effect');
    user
  },[refresh]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(()=> !isModalVisible)
    const refreshComponent = () => setRefresh(()=> !refresh)
    
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const handleModal2 = () => setIsModalVisible2(()=> !isModalVisible2)
    let [selectItem, setItem] = useState({});
    const animation = useRef(new Animated.Value(0)).current
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const submit = ()=>{
      if(myTimeout !== null){
        console.log('myTimeaout',myTimeout);
        clearTimeout(myTimeout);
      }
      setTap(0);
      handleModal()
      const myTime = setTimeout(()=>{setTap(1)},10000);
      setMyTimeout(myTime);
      
    }
    const chooseUser = (item)=>{
      setItem(item)
      handleModal2();
    }

    const choose =(id)=>{
      const data = {user,id}
      socketRef.current.emit('chooseUser',data);
      handleModal2();
    }
  
  useEffect(()=>{
  socketRef.current = socket;       
  
  socketRef.current.on('deleteMember',(dataUserAround)=>{
    removeUserAround(dataUserAround);
    console.log('removUser',dataUserAround.dataUser.pseudo,usersNear.length); 
  });
        
        
  socketRef.current.on('newMember',(data)=>{
    console.log('new Member',data.dataUser.pseudo)
    if(data.dataUser.pseudo !== undefined){
      if(findOne(data,user) === 1){
        addUserAround(data);
        const newMemberId= data.socketId
        socketRef.current.emit("acceptMember",{newMemberId,user})
        refreshComponent()
      }
          
    }
  })
  socketRef.current.on('welcome',(dataUserAround)=>{
    if(dataUserAround.dataUser.pseudo !== undefined ){
      if(findOne(dataUserAround,user) === 1){
        addUserAround(dataUserAround)
        refreshComponent()
      }
      
     }
    })
    socketRef.current.on('choice',function(data){
      console.log('socket data choice', data.dataUser.pseudo)
      const constraint = waitingContraint(user,data);
      if(constraint === 1){
        const waiters = user.waiting.concat(data);
        user.waiting = waiters;
        user.notif = user.notif + user.waiting.length;
        refreshComponent()
      }
    })
    socketRef.current.on('switched',(item)=>{
      const constraint = contraintsBeforeSwitch(user,item)
      console.log('CONSTRAINT', constraint)
      if(constraint === 1){
        console.log('JUST A SWITCHED TEST')
        addSwitcher(item,user);
        user.notif = user.notif +1;
        refreshComponent()
      }
      
  });
     return () => {
      
      socketRef.current.disconnect();
    };
},[])
  
  useEffect(()=>{
    setUsersAround(usersNear);
  },[usersNear,sheetRef])
      
  
      
    const ShowInfo = useCallback(()=>{
      return(
          
              <View style={[styles.modalView]}>
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
                          <TouchableOpacity onPress={()=>{handleModal2()}}><Fontisto name="close" size={45} color="#FF6F91" style={{marginRight:30}}/></TouchableOpacity>
                          <TouchableOpacity onPress={() => {choose(selectItem.socketId)}}><MaterialCommunityIcons name="target-account" size={50} color="#00FFFF" style={{marginLeft:30}}/></TouchableOpacity>
                      </View>
              </View>
              )

  },[selectItem])
  

  const ShowAnimation = useCallback(()=>{
    return(
      <View
      style = {[styles.view1]}
      underlayColor = '#ccc'
    >
           {
             [...Array(3).keys()].map((index)=>{
              /*if(index === 1) colorAnime = '#ffff02'; 
              if(index === 2) colorAnime = '#4fe2ec'
               if(index === 3) colorAnime = '#fb3aa2';*/
               if(index === 4) colorAnime = '#00ff02';
               if(index === 5) colorAnime = '#45064e'; 
              if(index === 6) colorAnime = '#1A24FE'
               if(index === 7) colorAnime = '#DF0CE8';
               if(index === 8) colorAnime = '#FF440D';
               return(
                 <>
                <MotiView
                from={{opacity:1, scale: 1}}
                animate = {{opacity:1,scale:4}}
                transition={{
                  type: 'timing',
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index*800,
                  //repeatReverse:false,
                  loop:true
                }}
                key={index}
                style = {[StyleSheet.absoluteFillObject,styles.view1,{borderColor:colorAnime,shadowColor:colorAnime}]}
                underlayColor = '#ccc'
              />
              </>
              
               )
             })
           }
            
        </View>
    )
  },)
  
  console.log('refresh',refresh,user.notif)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <TouchableOpacity onPress={
                useCallback(()=>{
                  setEffect(!effect)
                    sheetRef.current?.snapToIndex(index);
                    if(!isOpen){
                        setIsOpen(true)
                    }
                },[])
                
                }>
                  <View style={{flexDirection:'row'}}>
                            <View style={[styles.profil]}>
                            <Image source={{uri: user.img}} style={styles.profilImage}/>
                            </View>
                            
                        {user.notif!==0?<View style={{borderRadius:50,backgroundColor:'#d1001c',height:14,width:14,alignSelf:'center', marginTop:-45,marginLeft:-27}}>
            </View>:null}
       
                        </View>
                
      </TouchableOpacity>
      
                
        <View style={{justifyContent:'center',alignItems:'center',paddingTop:dim.height/3.5}} >
        {/*<ShowAnimation />*/}
          {/*<Bubble colorB={'orange'} sizeB={100} />*/}
        </View>
      
        
        
        <SetPos user={user} socketRef={socketRef} />
          <View style={[{justifyContent:'flex-end',alignItems:'center',paddingTop:dim.height/4}]}>
          <TouchableOpacity onPress={submit}>
                {tap==1?<Text style={{fontSize:26,color:'black',fontWeight:'bold'}} >TAP</Text>:
                <Text style={{color:'#000000',fontSize:50}}>
                {usersAround.length}
          </Text>}
          </TouchableOpacity>
              </View>
  
        
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
              onClose={()=>{setIsOpen(false);}}
            topInset={headerHeight}
            initialSnapIndex={1}
            //onChange={handleSheetChange}
            backgroundComponent={() =>
                <View style={styles.contentContainer}/>
              }
            handleComponent={() =>
            <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
            </View>
      }
            
            >
                
                
                <View style={{paddingLeft:dim.width/1.2,height:40}}>
                   <Button title="OK" onPress={handleClosePress}  color='#008080'/>
                </View>
              <Navigator props={props} token={token} user={user} socketRef={socketRef}/>
            </BottomSheet>
        <Modal isVisible={isModalVisible} swipeArea={20} swipeThreshold={50} transparent={true}>
            <TouchableOpacity onPress={submit}>
                <Fontisto name="close-a" size={24} color="black" style={[{paddingTop:50, alignSelf:'flex-end', borderRadius:50,marginBottom:20}]}/>
            </TouchableOpacity>
            <ScrollView style={{}} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {x:animation}}}], {useNativeDriver:false})}> 
                <View style={styles.scrollComponent} >
                  {
                    usersAround.map((item)=>{
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
                      return(
                        <Animated.View style={{flexDirection: 'row', padding: SPACING, marginBottom:SPACING, backgroundColor:'rgba(0,0,0,0.8)',
                             borderRadius: 16,
                             shadowColor:"#000",
                             shadowOffset:{
                                 width: 0,
                                 height:10
                             },
                             shadowOpacity: .3,
                             shadowRadius: 20,
                             opacity,
                             transform: [{scale}],
                             }}
                             key={item.dataUser.pseudo}
                             >
                               <TouchableOpacity onPress={() => {chooseUser(item)}} style={{width:dim.width, flexDirection:'row'}}>
                                  <Image
                                  source={{uri: item.dataUser.img}}
                                  style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius:AVATAR_SIZE,
                                  marginRight: SPACING/2
                                  }}
                                  />
                                  <View>
                                      <Text style={{fontSize:22, fontWeight:'700', color:'#fff'}}>{item.dataUser.name}</Text>
                                      <Text style={{fontSize:19, opacity: .7, color:'#fff',fontWeight:'300'}}>@{item.dataUser.pseudo}</Text>
                                      <Text style={{fontSize:13, opacity: .8, color:'#00FFFF',width:dim.width/2}} numberOfLines={1} ellipsizeMode="tail">{item.dataUser.bio}</Text>
                                      
                                  </View>
                               </TouchableOpacity>
                                
                            </Animated.View>
                      )
                    })
                  }
        </View>
        </ScrollView> 
        <Modal animationType="slide"
                    transparent={true}
                    visible={isModalVisible2}
                    onRequestClose={handleModal2}>
          <ShowInfo />
        </Modal>
        </Modal>
        
    
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },

    profilImage:{
      width:70,
      height:70,
      borderRadius:70/2,
  },
  profil:{
      paddingTop:30,
      padding:10,
      borderColor:'#000000'
  },
    shadow: {
      shadowColor: '#202020',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 10,
      
      shadowOpacity:.75,
      shadowRadius:5,
    },
    contentContainer: {
      ...StyleSheet.absoluteFillObject,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: '#000000',
      opacity:.9
    },
    closeLineContainer: {
      alignSelf: 'center'
    },
    closeLine: {
      width: 40,
      height: 6,
      borderRadius: 3,
      backgroundColor: lightNeutralColor,
      //marginTop: 2,
    },
    scrollComponent:{
        justifyContent: 'center',
        //alignItems:'center',
        width:Dimensions.get("window").width-40
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
    view1:{
      borderRadius: Math.round(dim.width + dim.height) / 2,
      width: 80,
      height: 80,
      backgroundColor:'#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth :5,
      shadowOffset:{
        width:0,
        height:0
      }  ,
      shadowOpacity:.75,
      shadowRadius:1,
      //elevation:9 
    },
    
  });

export default Main;



