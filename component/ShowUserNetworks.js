import { View,Image,StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
function ShowUserNetworks({userNetworks}){
    const networks = userNetworks.split(" ");
    function isNumeric(val) {
        return /^-?\d+$/.test(val.trim());
    }
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',}}>
                            {
                                networks.map((network) => {
                                    if(network !==''){
                                        if(network.indexOf('instagram.com')>=0){
                                            const insta = network.trim();
                                        return (
                                      <View
                                      key={network} style={{marginRight:5}}
                                      >
                                          
                                          <Entypo name="instagram-with-circle" size={35} color="#00FFFF" style={styles.icon} />                                      
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('tiktok.com')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <FontAwesome5 name="tiktok" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('snapchat.com')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <FontAwesome5 name="snapchat" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('facebook.com')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <Entypo name="facebook-with-circle" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('//pin.it/')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <Entypo name="pinterest-with-circle" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('//t.me/')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                       <FontAwesome5 name="telegram" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('www.linkedin.com')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <Entypo name="linkedin-with-circle" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('youtube.com')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <Entypo name="youtube-with-circle" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(network.indexOf('twitch.tv')>=0){
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <FontAwesome5 name="twitch" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }
                                    else if(isNumeric(network)){
                                        const number=network.trim();
                                        return (
                                      <View key={network} style={{marginRight:5}}>
                                        <FontAwesome5 name="whatsapp-square" size={35} color="#00FFFF" style={styles.icon} />
                                      </View>
                                        );
                                    }else{
                                        return (
                                            <View key={network} style={{marginRight:5}}>
                                              <FontAwesome name="reddit" size={35} color="#00FFFF" style={styles.icon} />
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
    icon :{
        opacity:0.5,
    },
})

export default ShowUserNetworks;