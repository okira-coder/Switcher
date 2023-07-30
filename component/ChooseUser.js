import React,{useCallback,useRef,useState} from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image,Switch,Linking} from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Modal  from 'react-native-modal'

const SPACING = 20;
const AVATAR_SIZE = 45;
const ITEM_SIZE = AVATAR_SIZE + SPACING *3;
const widthWindow = Dimensions.get('window').width;
function ChooseUser({item}){
  return (
    <>
          <SafeAreaView style={styles.modalView}>
          <Image source={{uri: item.image}}
        style={{width: 300, height: 300, borderRadius:20}}/>
        <Text style={{fontSize:25}}>{item.name}</Text>
                <Text style={{fontSize:20, fontWeight:'300'}}>{item.jobTitle}</Text>
                <Text >{item.email}</Text>

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
            </View>
            </SafeAreaView>
      
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    with:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  modalView: {
    with:Dimensions.get('window').width,
    height:Dimensions.get('window').height/1.75,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    
  },
  
});
export default ChooseUser;