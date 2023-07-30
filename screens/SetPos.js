import * as React from 'react';
import { Platform, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity,  SafeAreaView, ScrollView,Button, Linking, AppState} from 'react-native';
import { useRef, useState, useEffect,useCallback } from 'react';

import Modal  from 'react-native-modal';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { usersNear } from '../models/UsersAround';
import {getPos} from '../models/GetPos';
import { GetStreet, setStreet } from '../models/GetStreet';
import socket from '../api/socket';
import { createRoom, lastNumber } from '../models/CreateRoom';
import { getInvisible, getQuickSwitch } from '../models/SwitchContraint';
const LOCATION_TASK_NAME = 'background-location-task';
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ dataLocation, error}) => {
    if (error) {
      console.log('erreur: ',error);
      return
    }
    if (dataLocation) {
      const { locations } = dataLocation
      const location = locations[0]
      if (location) {
        console.log("Location in background", location.coords)
        const {altitude, latitude,longitude} = location.coords;
        backgroundSocket(latitude,longitude,altitude);
      }
    }
  })


function SetPos({user,socketRef}){
    const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
    const [openSetting, setOpenSetting] = useState(false)
    const [position, setPosition] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [exRoom, setRoom] = useState('');
    let foregroundSubscription;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  
  useEffect(()=>{
    startForegroundUpdate();
    return () => {
      setIsLocationModalVisible(false);
      setOpenSetting(false)
      setPosition(null)
      setErrorMsg(null);
    };
  },[])
  const setStateLocation = ()=>{
    setIsLocationModalVisible(false);
    setOpenSetting(true);
}
const setIsLocationModalIsVisible = ()=>{
    setIsLocationModalVisible(true);
}
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
          //stopBackgroundUpdate
          startForegroundUpdate()
        //getGeolocation()
      }else{
        stopForegroundUpdate
        //startBackgroundUpdate();   
      }
      //getGeolocation();
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
      else{
        setIsLocationModalIsVisible();
      }
    }
    requestPermissions();
  }, [isLocationModalVisible]);
  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }
    //foregroundSubscription?.remove()
     foregroundSubscription = await Location.watchPositionAsync(
      {
        //accuracy: Location.Accuracy.BestForNavigation,
          //timeInterval:1000,
          distanceInterval: 1,
      },(location) => {
          setPosition(location.coords)
          const {altitude, latitude,longitude} = location.coords;
          const room = createRoom(latitude,longitude);
          const x = lastNumber(latitude);
          const y  = lastNumber(longitude);
          if(exRoom !== room){
            const dataRoom = {exRoom,room,}
            setRoom(room)
            socketRef.current.emit("changeRoom", dataRoom);
          }
          const data= {latitude,longitude,user,usersNear,x,y,room,invisible:getInvisible(),quickSwitch:getQuickSwitch()}
          socketRef.current.emit("setPos", data);

            Location.reverseGeocodeAsync({
                latitude,
                longitude
              }).then((response)=>{
                for (let item of response) {
                  //const adresse = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                  const adresse = `${item.street}, ${item.postalCode}, ${item.city}`;
                  setStreet(adresse);
                    }
              })

      }
    )
  }
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove()
    setPosition(null)
  }
  /*const startBackgroundUpdate = async () => {
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      //setIsLocationModalIsVisible();
      return
    }
    const isTaskDefined =  TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    ).then(()=>{console.log("Already started")
    return})

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }*/
  /*const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      console.log("Location tacking stopped")
    }
  }*/
  /*const backgroundSocket = (latitude,longitude,altitude)=>{
    const data= {latitude,longitude,altitude, user, exPos}
    socketRef.current.emit("setPos", data);
    console.log('coords in background: ',data.altitude,data.latitude,data.longitude)
    
  }*/
    //
    
    let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (position) {
        text = JSON.stringify(position);
      }
    const openSettings = ()=>{
      console.log('setting')
        if(Platform.OS == 'ios'){
           Linking.openURL('app-settings:')}
        else{IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
        )}
        setOpenSetting(false);
    }
console.log(openSetting)
    return(
        <SafeAreaView>
           {/* <View >
                <Text >{text}</Text>
            </View>*/}
            <Modal isVisible={isLocationModalVisible} onModalHide={openSetting?openSettings():undefined}>
            <View style={{height:300, width:300, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                <Button  onPress={setStateLocation} title="Enable Location Services"/>
            </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  profilImage:{
      width:100,
      height:100,
      borderRadius:50,
  },
  profil:{
      paddingTop:30,
      padding:10,
      borderColor:'#000000'
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#000000'
  },
  closeLineContainer: {
    alignSelf: 'center'
  },
  closeLine: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D3D3D3',
    marginTop: 9,
  },
  scrollComponent:{
      justifyContent: 'center',
      //alignItems:'center',
      width:Dimensions.get("window").width-40
  },
  modalView: {
    with:Dimensions.get('window').width,
    height:Dimensions.get('window').height/1.5,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    marginTop:99        
  },
  
});
export default SetPos;