import React,{useCallback,useRef,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image} from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import EditMenuProfile from './EditMenuProfile';
import Decision from '../component/Decision';
import Notifications from './Notifications';
import EditProfile from './EditProfile';

function MenuProfile(){
    const [selectNotification, setNotification] = useState(false);


    return(
        <View>
            {selectNotification?<Notifications />:<EditProfile />}
        </View>
    )
}

const styles = StyleSheet.create({
      
});
export default MenuProfile;

