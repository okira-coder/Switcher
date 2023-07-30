import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,SafeAreaView,TextInput,ScrollView } from 'react-native';
import client from '../api/client';
import images from '../component/ImageNetworks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconNetWorks from '../component/IconNetWorks';
import { useNavigation } from '@react-navigation/native';
import Modal  from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';


const updateNetworks =[]
 function UpdateNetworks({token, user}){
    const navigation = useNavigation();
   let socialMedia = '';
   const networks = user.networks.split(" ");

   const instaLink = 'https://instagram.com/';
   const facebookLink = 'https://www.facebook.com/';
   const pinterestLink = 'https://pin.it/';
   const snapLink = 'https://t.snapchat.com/'; 
   const tiktokLink ='https://vm.tiktok.com/';
   const telegramLink='https://t.me/';
   const redditLink ='https://';
   const linkedinLink = 'https://www.linkedin.com/in/';
   const whatsappLink='';
   const youtubeLink = 'https://www.youtube.com/';
   const twitchLink = 'https://twitch.tv/';

     const whatsapp = images.whatsapp
    const facebook = images.facebook
    const instagram= images.instagram
    const snapchat = images.snapchat
    const tiktok= images.tiktok
    const twitter = images.twitter
    const linkedin= images.linkedin
    const youtube = images.youtube
    const twitch = images.twitch
    const reddit = images.reddit
    const telegram = images.telegram
    const pinterest = images.pinterest
    const google = images.google
    const meetup = images.meetup
    const discord = images.discord
    
    const [text, handleText] = useState('');
    const [text1, handleText1] = useState('');
    const [text2, handleText2] = useState('');
    const [text3, handleText3] = useState('');
    const [text4, handleText4] = useState('');
    const [text5, handleText5] = useState('');
    const [text6, handleText6] = useState('');
    const [text7, handleText7] = useState('');
    const [text8, handleText8] = useState('');
    const [text9, handleText9] = useState('');
    const [text10, handleText10] = useState('');
    const [text11, handleText11] = useState('');
    
    function isNumeric(val) {
      return /^-?\d+$/.test(val.trim());
  } 

    useEffect(()=>{
        if(user){
            networks.map((network) => {
        if(network !==''){
            if(network.indexOf('//instagram.com/')>=0){
                handleText5(network.trim())
                updateNetworks[5] = network.trim();
        }
        else if(network.indexOf('tiktok.com')>=0){
            handleText2(network.trim());
            updateNetworks[2] = network.trim();
        }
        else if(network.indexOf('snapchat.com')>=0){
            handleText4(network.trim());
            updateNetworks[4] = network.trim();
        }
        else if(network.indexOf('facebook.com')>=0){
            handleText1(network.trim());
            updateNetworks[1] = network.trim();
        }
        else if(network.indexOf('//pin.it/')>=0){
            handleText3(network.trim());
            updateNetworks[3] = network.trim();
        }
        else if(network.indexOf('//t.me/')>=0){
            handleText10(network.trim());
            updateNetworks[10] = network.trim();
        }
        else if(network.indexOf('www.linkedin.com')>=0){
            handleText6(network.trim());
            updateNetworks[6] = network.trim();
        }
        else if(network.indexOf('youtube.com')>=0){
            handleText7(network.trim());
            updateNetworks[7] = network.trim();
        }
        else if(network.indexOf('twitch.tv')>=0){
            handleText11(network.trim());
            updateNetworks[11] = network.trim();
        }
        else if(network.indexOf('twitter.com')>=0){
            handleText8(network.trim());
            updateNetworks[8] = network.trim();
        }
        else if(isNumeric(network)){
            const number=network.trim();
            handleText(network.trim());
            updateNetworks[0] = network.trim();
        }else{
            handleText9(network.trim())
            updateNetworks[9] = network.trim();
        }
        }
        
      })
        }
        
    },[]);
      
    const [isModalVisible, setIsModalVisible] = useState(false);
   const handleModal = () => setIsModalVisible(()=> !isModalVisible)
   const [isModalVisible1, setIsModalVisible1] = useState(false);
   const handleModal1 = () => setIsModalVisible1(()=> !isModalVisible1)
   const [isModalVisible2, setIsModalVisible2] = useState(false);
   const handleModal2 = () => setIsModalVisible2(()=> !isModalVisible2);
   const [isModalVisible3, setIsModalVisible3] = useState(false);
   const handleModal3 = () => setIsModalVisible3(()=> !isModalVisible3)
   const [isModalVisible4, setIsModalVisible4] = useState(false);
   const handleModal4 = () => setIsModalVisible4(()=> !isModalVisible4);
   const [isModalVisible5, setIsModalVisible5] = useState(false);
   const handleModal5 = () => setIsModalVisible5(()=> !isModalVisible5);
   const [isModalVisible6, setIsModalVisible6] = useState(false);
   const handleModal6 = () => setIsModalVisible6(()=> !isModalVisible6);
   const [isModalVisible7, setIsModalVisible7] = useState(false);
   const handleModal7 = () => setIsModalVisible7(()=> !isModalVisible7);
   const [isModalVisible8, setIsModalVisible8] = useState(false);
   const handleModal8 = () => setIsModalVisible8(()=> !isModalVisible8);
   const [isModalVisible9, setIsModalVisible9] = useState(false);
   const handleModal9 = () => setIsModalVisible9(()=> !isModalVisible9);
   const [isModalVisible10, setIsModalVisible10] = useState(false);
   const handleModal10 = () => setIsModalVisible10(()=> !isModalVisible10);
   const [isModalVisible11, setIsModalVisible11] = useState(false);
   const handleModal11 = () => setIsModalVisible11(()=> !isModalVisible11);
  
   const [message,setMessage] = useState('');
    const handleChangeMessage = (valeur)=>{setMessage(valeur)}
   const isValideNetwork = (verifyLink,link)=>{
    if(link.indexOf(verifyLink) !== -1 && !(/\s/.test(link)) && (verifyLink.length < link.length-3) && link.length >0 ) return true;
    return false
  }
  const isValidHandlePress = (verifyLink, link,num)=>{
    if(Object.keys(updateNetworks).length > 3) return false;
    if(isValideNetwork(verifyLink, link)){
      if(verifyLink===''){
        if(num===0 && text.length < 10){return false} 
        if(num===5) link=instaLink+link+'?r=nametag';
        if(num===11) link=twitchLink+link;
      }
      updateNetworks[num] = link;
      return true;
    }
    return false;
  }

  const cancel =(num)=>{
    switch(num){
      case 0:
        if(num in updateNetworks) {delete updateNetworks[num]};
        handleModal();
        const cancelled = ()=>{
          if(text.length <= 0) {handleModal();}
          else{ handleText('')}
          }
        cancelled();
        break;
      
      case 1:
        if(num in updateNetworks){ delete updateNetworks[num]};
          const cancelled1 = ()=>{
          if(text1.length <= 0) {handleModal1();}
          else{ handleText1('')}
          }
          cancelled1();
          console.log('case')
        break;
      case 2:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled2 = ()=>{
          if(text2.length <= 0) {handleModal2();}
          else{ handleText2('')}
          }
          cancelled2();
        break;

      case 3:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled3 = ()=>{
          if(text3.length <= 0) {handleModal3();}
          else{ handleText3('')}
          }
          cancelled3();
        break;

      case 4:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled4 = ()=>{
          if(text4.length <= 0) {handleModal4();}
          else{ handleText4('')}
          }
          cancelled4();
        break;
      
      case 5:
        if(num in updateNetworks) {console.log('delete',num);delete updateNetworks[num]};
        const cancelled5 = ()=>{
          if(text5.length <= 0) {handleModal5();}
          else{ handleText5('')}
          }
          cancelled5();
        break;

      case 6:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled6 = ()=>{
          if(text6.length <= 0) {handleModal6();}
          else{ handleText6('')}
          }
          cancelled6();
        break;
      
      case 7:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled7 = ()=>{
          if(text7.length <= 0) {handleModal7();}
          else{ handleText7('')}
          }
          cancelled7();
        break;

      case 8:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled8 = ()=>{
          if(text8.length <= 0) {handleModal8();}
          else{ handleText8('')}
          }
          cancelled8();
        break;

      case 9:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled9 = ()=>{
          if(text9.length <= 0) {handleModal9();}
          else{ handleText9('')}
          }
          cancelled9();
        break;

      case 10:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled10 = ()=>{
          if(text10.length <= 0) {handleModal10();}
          else{ handleText10('')}
          }
          cancelled10();
        break;

      case 11:
        if(num in updateNetworks) delete updateNetworks[num];
        const cancelled11 = ()=>{
          if(text11.length <= 0) {handleModal11();}
          else{ handleText11('')}
          }
          cancelled11();
        break;
    }
  }
  const [select,setSelect] = useState(0);
  const handleSelect = ()=>{
    setSelect(1);
    setTimeout(()=>{setSelect(0)},5000)
  }
  const clientServer = async()=>{
    const values = Object.values(updateNetworks);
    values.map((network)=>{
      socialMedia = socialMedia+network.trim()+' ';
    })
    console.log("social media", socialMedia) 
    try {
      await client.post('/updateNetworks',{socialMedia},{
      headers: {
          Accept: 'application/json',
          //'content-Type': 'multipart/form-data',
          session : `JWT ${token}`,
        }
      }).then((res)=>{
          console.log('network success', res.data);
        if(res.data.success){
            user.networks = socialMedia;
            navigation.goBack();
        }
        if(!res.data.success){
          handleChangeMessage(res.data.message)
      }
      })
      
    } catch (error) {
      console.log(error.message)
    }
  } 
  const submit = ()=>{
    if(Object.keys(updateNetworks).length <=0) handleSelect();
    else{
      clientServer();
    }
  } 
  return(
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>
                <Ionicons name="chevron-back" size={24} color="gray" />                 
                </TouchableOpacity>
                <Text style={{color:'#008080', fontSize:20}}>Networks</Text>
                <TouchableOpacity onPress={submit}>
                <Text style={{color:'white', fontSize:20}}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:30}}>
              {select===1?<Text style={{color:'red',alignSelf:'center'}}>Please, choose minimum one social media !!</Text>:null}
              <Text style={{color:'red', alignSelf:'center', paddingBottom:20}}>{message}</Text>
          </View>
        <KeyboardAwareScrollView extraHeight={120} style={styles.keyboard} enableOnAndroid={true}>
          <View style={{alignItems:'center', paddingTop:40}}>
            <Text style={{color:'#00FFFF', fontSize:23,}}>Just touch !!</Text>
            <Text style={{color:'white', fontSize:16,}}>You have {Object.keys(updateNetworks).length}/3 social networks </Text>
            <Text style={{color:'white', fontSize:16,}}>Maximum three social UpdateNetworks </Text>
          </View>
            <View style={{paddingTop:20,paddingBottom:20}}>
            <View style={styles.section1}>
            <View>
              <TouchableOpacity onPress={handleModal}   style={{height:80,width:80}}>
                <IconNetWorks path={whatsapp}/>
              </TouchableOpacity> 
              <Modal isVisible={isModalVisible}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                    <Text style={{color:'#fff', fontSize:18, marginBottom:30}}>Please, Make sure to enter your phone number</Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                    <TextInput value={text} onChangeText={(val)=>handleText(val)} keyboardType ='numeric' placeholder='0784673441' placeholderTextColor='#938f8f' style={styles.TextInputComponent} />   
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(0)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress('', text,0))?handleModal:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View>
              <TouchableOpacity onPress={handleModal1}  style={{height:80,width:80}}>
                <IconNetWorks path={facebook}/>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible1}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:10, fontWeight:'bold'}}>Please, make sure to enter your facebook link</Text>
                  <Text style={{color:'#fff', fontSize:16, alignSelf:'center'}}>open your facebook account: </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Go to profil</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Click on '...' at the right of 'change profil'</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', }}>Scroll down And click on 'copy link'</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center',  marginBottom:30}}>Paste on the text input down</Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text1} onChangeText={(val)=>handleText1(val)} placeholder={facebookLink} placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(1)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(facebookLink, text1,1))?handleModal1:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View>
              <TouchableOpacity onPress={handleModal2}  style={{height:80,width:80}}>
                <IconNetWorks path={tiktok}/>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible2}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                    <Text style={{color:'#fff', fontSize:18, marginBottom:30}}>Please, Make sure to enter your tiktok link . </Text>
                    <Text style={{color:'#fff', fontSize:16, alignSelf:'center'}}>open your tiktok app: </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Go to profil</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', }}>Click on 'menu button' at the corner top right</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', }}>Click on 'settings and privacy'</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', }}> Click on 'share profile'</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center',  marginBottom:30}}>Copy link</Text>                  
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text2} onChangeText={(val)=>handleText2(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>    
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(2)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(tiktokLink, text2,2))?handleModal2:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>               
            </View>
              <View style={styles.section1}>
              <View>
                <TouchableOpacity onPress={handleModal3}  style={{height:80,width:80}}>
                <IconNetWorks path={pinterest}/>
              </TouchableOpacity> 
              <Modal isVisible={isModalVisible3}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:10}}>Please, make sure to enter your pinterest profile link</Text>
                  <Text style={{color:'#fff', fontSize:16, alignSelf:'center'}}>open your pinterest account: </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Go to profil</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Click on '...' at the right top and click on 'copy link' </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', marginBottom:30}}>Paste on the text input down</Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text3} onChangeText={(val)=>handleText3(val)} placeholder={pinterestLink+'5XOuA4N'} placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(3)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(pinterestLink, text3,3))?handleModal3:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal> 
              </View>
              <View>
                <TouchableOpacity onPress={handleModal4}  style={{height:80,width:80}}>
                <IconNetWorks path={snapchat}/>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible4}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:10}}>Please, make sure to enter your snapchat profile link</Text>
                  <Text style={{color:'#fff', fontSize:16, alignSelf:'center'}}>open your snapchat app: </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Go to profil</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Click on "small snap codesmall" and click on "copy link" at the bottom </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', marginBottom:30}}>Paste on the text input down</Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text4} onChangeText={(val)=>handleText4(val)} placeholder={snapLink} placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(4)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(snapLink, text4,4))?handleModal4:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>  
              </View>
              <View>
                <TouchableOpacity onPress={handleModal5}  style={{height:80,width:80}}>
                <IconNetWorks path={instagram}/>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible5}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:30}}>Please, make sure to enter your instagram username </Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text5} onChangeText={(val)=>handleText5(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>    
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(5)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress('', text5,5))?handleModal5:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>               
          </View>
          <View style={styles.section1}>
              <View>
                <TouchableOpacity onPress={handleModal6}  style={{height:80,width:80}}>
                <IconNetWorks path={linkedin}/>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible6}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:10}}>Please, make sure to enter your linkedin profile link</Text>
                  <Text style={{color:'#fff', fontSize:16, alignSelf:'center'}}>open your linkedin account: </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Go to profil</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Click on '...' </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', marginBottom:30}}>Click on "share via" and copy link </Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text6} onChangeText={(val)=>handleText6(val)} placeholder={linkedinLink} placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>    
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(6)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(linkedinLink, text6,6))?handleModal6:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>   
              </View>
              <View>
                <TouchableOpacity onPress={handleModal7}  style={{height:80,width:80}}>
                <IconNetWorks path={youtube}/>
                </TouchableOpacity> 
                <Modal isVisible={isModalVisible7}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:10}}>Please, make sure to enter your youtube profile link</Text>
                  <Text style={{color:'#fff', fontSize:16, alignSelf:'center'}}>open your youtube app: </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Go to profil</Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Click on 'my channel' </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center'}}>Click on the three dots at the top right </Text>
                  <Text style={{color:'#00ffff', fontSize:16, alignSelf:'center', marginBottom:30}}>Click on 'Share' and copy link</Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text7} onChangeText={(val)=>handleText7(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>  
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(7)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(youtubeLink, text7,7))?handleModal7:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>
              <View>
                <TouchableOpacity onPress={handleModal8} style={{height:80,width:80}}>
                  <IconNetWorks path={twitter}/>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible8}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:30}}>Please, make sure to enter your twitter pseudo </Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text8} onChangeText={(val)=>handleText8(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>  
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(8)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress('', text8,8))?handleModal8:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>               
          </View>
          <View style={styles.section1}>
              <View>
                <TouchableOpacity onPress={handleModal9}  style={{height:80,width:80}}>
                <IconNetWorks path={reddit}/>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible9}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:30}}>Please, make sure to enter your reddit pseudo</Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text9} onChangeText={(val)=>handleText9(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{cancel(9)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress('', text9,9))?handleModal9:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>   
              </View>
              <View>
                <TouchableOpacity onPress={handleModal10}  style={{height:80,width:80}}>
                <IconNetWorks path={telegram}/>
              </TouchableOpacity>  
              <Modal isVisible={isModalVisible10}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:30}}>Please, make sure to enter your telegram username </Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text10} onChangeText={(val)=>handleText10(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>    
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{cancel(10)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress(telegramLink,text10,10))?handleModal10:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>
              <View>
                <TouchableOpacity onPress={handleModal11}  style={{height:80,width:80}}>
                <IconNetWorks path={twitch}/>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible11}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View>
                  <Text style={{color:'#fff', fontSize:20, marginBottom:30}}>Please, make sure to enter your twitch username </Text>
                  </View>
                  <View style={{paddingBottom:20}}>
                  <TextInput value={text11} onChangeText={(val)=>handleText11(val)} placeholder='okira123' placeholderTextColor='#938f8f' style={styles.TextInputComponent}/>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{cancel(11)}}><Image source={require('../assets/cancel.png')} style={{height:70, width:70, marginRight:30}} /></TouchableOpacity>
                    <TouchableOpacity onPress={(isValidHandlePress('', text11,11))?handleModal11:null}><Image source={require('../assets/check.png')} style={{height:72, width:72, marginLeft:30}}/></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </View>               
          </View>
            </View>
                
        </KeyboardAwareScrollView>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    keyboard:{
        flex: 1,
        paddingBottom:10,
        //backgroundColor: "#FFF",
       // height: 200,
        
    },
    icon:{
        width:30,
        height:30
    },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section1:{
    flexDirection :'row',
    alignItems:'flex-start',
    alignContent:'space-between',
    alignContent:'space-around',
    justifyContent: 'space-around',
    paddingBottom:20

},
TextInputComponent:{borderWidth: 1,
  borderColor: '#00FFFF',
   height: 40,
    borderRadius: 8,
     fontSize:16,
      paddingLeft:10,
      marginBottom: 20,
      color:'#FFF',
      width : 150
  },
});

export default UpdateNetworks;

