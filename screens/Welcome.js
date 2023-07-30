import React from 'react';

import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, Dimensions,SafeAreaView, Animated,TouchableWithoutFeedback} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRef, useState, useEffect } from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import AppLoader from '../component/AppLoader'
import socket from '../api/socket';


const validationSchema = Yup.object().shape({
    name: Yup.string().trim().min(3, 'Invalide name!').required('Name is required!'),
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    username: Yup.string().trim().min(3, 'Invalide username!').required('Username is required!'),
    password: Yup.string().trim().min(8, 'Password is too short!').required('Password is required!'),
    confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'password does not match')
})
const validationSchemaLogin = Yup.object().shape({
    usernameLogin: Yup.string().trim().min(3, 'Invalide username!').required('Username is required!'),
    passwordLogin: Yup.string().trim().min(8, 'Password is too short!').required('Password is required!')
})
function Welcome({navigation}) {

    const userInfoLogin = {
        usernameLogin: '',
        passwordLogin: ''
    }
    const userInfo = {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword : ''
    }

    const isMounted = useRef(true);
    useEffect(()=>()=>(isMounted.current=false),[])
    const {width} = Dimensions.get('window');
    let leftHeaderTranslateX = 40;
    let rightHeaderOpacity = 0;
    let rightHeaderTranslateY = -20;
    let loginColorInterpolate = '#008080';
    let signupColorInterpolate = '#000000';
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
        outputRange: ['#008080', '#000000']
    })
    signupColorInterpolate = animation.interpolate({
        inputRange: [0,width],
        outputRange: ['#000000', '#008080']
    })
    const forgotPassword = ()=>{
        navigation.navigate('EmailAdresse');
    }
    const [message,setMessage] = useState();
    const handleChangeMessage=(val)=>{setMessage(val)};
    const [messageLogin,setMessageLogin] = useState();
    const handleChangeMessageLogin=(val)=>{setMessageLogin(val)};
    const [pending,setPending] = useState(false);
  return( 
      <>
  <LinearGradient
  colors={['#00FFFF', '#000000']}
  style={styles.container}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}>
    <SafeAreaView style={{paddingTop:120}}>
        <View style={{height:150, paddingTop:50}}>
            <View style={styles.heading}>
            <Animated.Text style={[styles.texting, { transform: [{translateX:leftHeaderTranslateX}]}]}>
                    Let's{'  '}
                </Animated.Text>                
                <Animated.Text style={[styles.texting, {opacity: rightHeaderOpacity, transform: [{translateY: rightHeaderTranslateY}]}]}>
                    Start To{' '}
                </Animated.Text>
            </View>
            <View style={{alignItems:'center'}}>
               <Text style={[styles.texting]}>Switch</Text> 
            </View>
            
        </View>
        <View style={{flexDirection: 'row', padding: 20 , marginBottom: 20}}>
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.buttonStyle ,styles.borderLeft]} backgroundColor={loginColorInterpolate}>
                    <Text style={styles.login}>Login</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.buttonStyle ,styles.borderRight]} backgroundColor={signupColorInterpolate}>
                    <Text style={styles.login}>Sign Up</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator = {false} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {x:animation}}}], {useNativeDriver:false})}>
        <KeyboardAwareScrollView extraHeight={200} style={styles.keyboard} enableOnAndroid={true}>
        <Formik initialValues={userInfoLogin} validationSchema={validationSchemaLogin} onSubmit={async(values, formikActions)=>{
            setPending(true)
            console.log(values)
            await client.post('/login',{
                ...values
            }).then((res)=>{
                    if(res.data.success){
                        socket.connect();
                        if(res.data.user.img === null || res.data.user.img === 'null'){
                            navigation.dispatch(
                                StackActions.replace('ImageUpload', {
                                    token: res.data.token,
                                    user: res.data.user
                                  })
                            )  
                        }
                        if(res.data.user.networks === null || res.data.user.networks === 'null'){
                            navigation.dispatch(
                                StackActions.replace('Networks', {
                                    token: res.data.token,
                                    user: res.data.user

                                  })
                            )  
                        }else{
                            navigation.dispatch(
                                StackActions.replace('Main', {
                                token: res.data.token,
                                user: res.data.user
                                })
                            )
                        }
                      
                }
                if(!res.data.success){
                    setPending(false);
                    handleChangeMessageLogin(res.data.message)
                }
            })
            formikActions.resetForm(); 
            formikActions.setSubmitting(false)
        }
        }>
            {({values,errors,touched,isSubmitting, handleChange, handleBlur, handleSubmit})=>{
                
                const {usernameLogin, passwordLogin} =values;
                const backgroundColor = isSubmitting? '#000000': '#008080';
            return <>
                 <View style={[styles.scrollComponent]}>
                    <Text style={{color:'red',fontSize:14,alignSelf:'center'}}>{messageLogin}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text  style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>Username</Text>
                    {touched.usernameLogin && errors.usernameLogin ? (<Text style={{color: 'red', fontSize: 16}}>{errors.usernameLogin}</Text>):null}
                    </View>
                    <TextInput value={usernameLogin} secureTextEntry={false} onChangeText={handleChange('usernameLogin')} onBlur={handleBlur('usernameLogin')}  placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent} autoCapitalize='none' />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>Password</Text>
                    {touched.passwordLogin && errors.passwordLogin ?(<Text style={{color: 'red', fontSize: 16}}>{errors.passwordLogin}</Text>):null}
                    </View>
                    <TextInput value={passwordLogin} secureTextEntry  onChangeText={handleChange('passwordLogin')} onBlur={handleBlur('passwordLogin')} placeholder='**********' placeholderTextColor='#938f8f' style={[styles.TextInputComponent]} autoCapitalize ='none' />
                    <TouchableOpacity  onPress={!isSubmitting ? handleSubmit: null} style={[styles.submitComponent , {backgroundColor}]} >
                    <Text style={{fontSize:20, color:'#fff'}}>Login</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={forgotPassword} style={{paddingTop:20,justifyContent:'flex-end',alignItems:"center"}}>
                            <Text style={{fontSize:16,color:'#000000'}}>Forgot Password ?</Text>
                        </TouchableOpacity>        
                    </View>   
                </View> 
            </>
            }}
        </Formik>
           
        </KeyboardAwareScrollView>
        
            <KeyboardAwareScrollView extraHeight={120} style={styles.keyboard} enableOnAndroid={true}>
                <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={async(values, formikActions)=>{
            setPending(true);
            await client.post('/new_user',{
                ...values
            }).then((res)=>{
                console.log("( 159 ) res.data.succes",res.data)
                    if(res.data.success){
                    navigation.dispatch(
                        StackActions.replace('Verification', {
                        token: res.data.token,
                        })
                    )
                }
                if(!res.data.success){
                    setPending(false)
                    handleChangeMessage(res.data.message)
                }else{handleChangeMessage('Server Error, Please try after')}
            })
                
            formikActions.resetForm(); 
            formikActions.setSubmitting(false)
        }
        }>
                    {({values,errors,touched,isSubmitting, handleChange, handleBlur, handleSubmit}) =>{
                        
                        const {name, email, username, password, confirmPassword} = values;
                        const backgroundColor = isSubmitting? '#000000': '#008080';
                    return <>
                        <View style={[styles.scrollComponent]}>
                            <Text style={{color:'red',fontSize:14,alignSelf:'center'}}>{message}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                            <Text style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>Name</Text>
                            {touched.name && errors.name ? (<Text style={{color: 'red', fontSize: 16}}>{touched.name && errors.name}</Text>):null}
                        </View>
                        
                        <TextInput value={name} onChangeText={handleChange('name')} onBlur={handleBlur('name')}  placeholder='Franck ARIKO' placeholderTextColor='#938f8f' style={styles.TextInputComponent} />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                            <Text style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>E-mail</Text>
                            {touched.email && errors.email ? <Text style={{color: 'red', fontSize: 16}}>{touched.email && errors.email}</Text>:null}
                        </View>
                        
                        <TextInput value={email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} autoCapitalize='none' placeholder='franck.ariko@gmail.com' placeholderTextColor='#938f8f' style={styles.TextInputComponent} />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                            <Text style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>Username</Text>
                            {touched.username && errors.username ? <Text style={{color: 'red', fontSize: 16}}>{touched.username && errors.username}</Text>:null}
                        </View>
                        
                        <TextInput value={username} secureTextEntry={false} onChangeText={handleChange('username')} onBlur={handleBlur('username')} placeholder='okira123' placeholderTextColor='#938f8f'  style={styles.TextInputComponent} autoCapitalize ='none'/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>Password</Text>
                        {touched.password && errors.password ? <Text style={{color: 'red', fontSize: 16}}>{touched.password && errors.password}</Text>:null}
                        </View>
                        
                        <TextInput value={password} secureTextEntry autoCapitalize='none' onChangeText={handleChange('password')} onBlur={handleBlur('password')}  style={styles.TextInputComponent} placeholder='**********' placeholderTextColor='#938f8f' />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={{fontSize:20, fontWeight: 'normal', color:'#fff'}}>Confirm Password</Text>
                        {touched.confirmPassword && errors.confirmPassword ? <Text style={{color: 'red', fontSize: 16}}>{touched.confirmPassword && errors.confirmPassword}</Text>:null}
                        </View>
                        
                        <TextInput value={confirmPassword} onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')}  secureTextEntry autoCapitalize='none' placeholder='**********' placeholderTextColor='#938f8f' style={styles.TextInputComponent} />
                        <TouchableOpacity  onPress={!isSubmitting ? handleSubmit: null} style={[styles.submitComponent , {backgroundColor}]} >
                        <Text style={{fontSize:20, color:'#fff'}}>Sign Up</Text>
                        </TouchableOpacity>   
                        </View>
                        </>
                    }}
                </Formik>
 
            </KeyboardAwareScrollView>
            
            
            
            
        </ScrollView>
        </SafeAreaView>
    </LinearGradient>
    {pending ? <AppLoader />:null}
</>
    
    )
}

const styles = StyleSheet.create({
    keyboard:{
        flex: 1,
        paddingBottom:10
    },
  container: {
    flex: 1,
    alignItems:'center'
  },
  heading:{flexDirection: 'row',
   justifyContent:'center',
    alignItems:'center'
  },
  texting:{
      fontSize: 40,
     fontWeight: 'bold',
      color:'#000000',
      
    },

    subTexting:{
        fontSize: 30,
         color:'#fff',
         },
    login:{
        color: 'white', 
        fontSize: 25
    },
    buttonStyle :{
        height: 45,
        width: Dimensions.get('window').width/2.2,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 20
    },
    borderLeft:{
        borderTopLeftRadius: 30,
        borderBottomLeftRadius:30,
        //
    },
    borderRight:{
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
        //
    },
    scrollComponent:{
        paddingHorizontal: 20,
         width: Dimensions.get('window').width
        },
    TextInputComponent:{
        borderWidth: 1,
        borderColor: '#21423C',
         height: 35,
          borderRadius: 8,
           fontSize:15,
            paddingLeft:10,
            marginBottom: 20,
            color:'#fff'
        },
    submitComponent:{
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }


});
export default Welcome
