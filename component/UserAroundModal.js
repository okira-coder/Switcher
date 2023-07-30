import React,{useCallback,useRef,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
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
function UserAroundModal({item}){
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <TouchableOpacity
    style={{flexDirection: 'row',paddingTop:10, marginBottom:1, backgroundColor:'#000000',
  }}
        onPress={() => setModalVisible(true)}
      >
        <Image source={{uri: item.image}}
        style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius:AVATAR_SIZE,marginRight: SPACING/2}}/>
            <View>
                <Text style={{fontSize:16, fontWeight:'700', color:'#fff'}}>{item.name}</Text>
                <Text style={{fontSize:14, opacity: .7, color:'#fff'}}>{item.jobTitle}</Text>
                <Text style={{fontSize:12, opacity: .8, color:'#fff'}}>{item.email}</Text>
            </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
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
      </Modal>
      
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
export default UserAroundModal;