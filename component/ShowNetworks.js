import React from 'react';

import { View,Image,TouchableOpacity,StyleSheet } from "react-native";

function ShowNetworks({networks}){
    const openNetwork = async (network) => {
        const supported = await Linking.canOpenURL(network)
        if (supported) {
          await Linking.openURL(network);
        } else {
          alert(`Don't know how to open this URL: ${network}`);
        } 
    }
    function isNumeric(val) {
        return /^-?\d+$/.test(val.trim());
    }
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingBottom:20}}>
                        <View style={{flexDirection:'row',}}>
                            {
                                networks.map((network) => {
                                    if(network !==''){
                                        if(network.indexOf('instagram.com')>=0){
                                            const insta = network.trim();
                                        return (
                                      <View
                                      key={network}
                                      >
                                          <TouchableOpacity onPress={()=>{openNetwork(insta)}}>
                                        <Image source={require('../assets/instagram.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('tiktok.com')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/tiktok.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('snapchat.com')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/snapchat.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('facebook.com')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/facebook.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('//pin.it/')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/pinterest.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('//t.me/')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/telegram.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('www.linkedin.com')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/linkedin.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('youtube.com')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/youtube.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('twitch.tv')>=0){
                                        return (
                                      <View key={network}>
                                          <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                        <Image source={require('../assets/twitch.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }
                                    else if(isNumeric(network)){
                                        const number=network.trim();
                                        return (
                                      <View key={network}>
                                        <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${number}`)}}>
                                        <Image source={require('../assets/whatsapp.png')} style={styles.media} />
                                      </TouchableOpacity>
                                      </View>
                                        );
                                    }else{
                                        return (
                                            <View key={network}>
                                                <TouchableOpacity onPress={()=>{openNetwork(network)}}>
                                              <Image source={require('../assets/reddit.png')} style={styles.media} />
                                            </TouchableOpacity>
                                            </View>
                                              );
                                    }
                                    }
                                    
                                  })
                            }
                        </View>
                        
                </View>
    )
}
const styles = StyleSheet.create({
    media:{
        height:50,
        width:50,
        marginRight:20
    }
});
export default ShowNetworks;