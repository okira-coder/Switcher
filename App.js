import React from 'react';
import { StyleSheet, } from 'react-native';
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome'
import ImageUpload from './screens/ImageUpload';
import Networks from './screens/Networks';
import Verification from './screens/Verification';

import Notifications from './screens/Notifications';
import Main from './screens/Main';
import EditProfile from './screens/EditProfile';
import EmailAdresse from './screens/EmailAdresse';
import EmailVerificationPassword from './screens/EmailVerificationPassword';
import ChangePassword from './screens/ChangePassword';
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])
const Stack = createStackNavigator();
const StackNavigator = ()=>{
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Welcome} name='Welcome' />
    <Stack.Screen component={Verification} name='Verification' />
    <Stack.Screen component={ImageUpload} name='ImageUpload' />
    <Stack.Screen component={Networks} name='Networks' />
    <Stack.Screen component={Main} name='Main' />
    <Stack.Screen component={Notifications} name='Notifications' />
    <Stack.Screen component={EditProfile} name='EditProfile' />
    <Stack.Screen component={EmailAdresse} name='EmailAdresse' />
    <Stack.Screen component={EmailVerificationPassword} name='EmailVerificationPassword' />
    <Stack.Screen component={ChangePassword} name='ChangePassword' />
  </Stack.Navigator>
)

}
export default function App() {
  return(
   <NavigationContainer theme={DarkTheme}>
     <StackNavigator />
   </NavigationContainer>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
