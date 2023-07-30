import React,{useCallback,useRef,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView,Dimensions,SafeAreaView, Platform, Animated, Image} from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import EditProfile from './EditProfile';

function Profile(){
    const sheetRef = useRef(null)
    
    const [isOpen, setIsOpen] = useState(true);
    const snapPoints = ["95%"]

    let index = 0;

    return(
        <SafeAreaView style={[styles.container,isOpen?{backgroundColor:'gray'}:{backgroundColor:'white'}]}>
            <TouchableOpacity onPress={
                useCallback(()=>{
                    sheetRef.current?.snapToIndex(index);
                    if(!isOpen){
                        setIsOpen(true)
                    }
                },[])
                
                }>
                <Text>Press me</Text>
            </TouchableOpacity>
            <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={()=>{setIsOpen(false)}}
            backgroundComponent={() =>
                <View style={styles.contentContainer}/>
              }
            handleComponent={() =>
            <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
            </View>
      }
            
            >
                <BottomSheetView >
                    <EditProfile/>
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});
export default Profile;

/*backgroundComponent={() =>
          <View style={styles.contentContainer}/>
        }
handleComponent={() =>
  <View style={styles.closeLineContainer}>
    <View style={styles.closeLine}></View>
  </View>
}
const styles = StyleSheet.create({
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'red'
  },
  closeLineContainer: {
    alignSelf: 'center'
  },
  closeLine: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.lightGray,
    marginTop: 9,
  },
}) */