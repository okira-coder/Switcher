import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, ScrollView} from 'react-native';
import ShowUserNetworks from './ShowUserNetworks';
const dim = Dimensions.get('window');
function ShowInfo({selectItem}){
    return(
        <View style={{width:dim.width/1.1,height:dim.height/1.92,justifyContent:'stretch',
        }}>
                            <ScrollView contentContainerStyle={{ 
            
            
            
            }}>
                   <Image source={[{uri: selectItem.dataUser.img}]}
                     
                     style={{width: dim.width/1.1, height: dim.width/1.1,
                      borderRadius:20, marginBottom:5,}}/>
                     
                         <View style={{justifyContent:'center',alignItems:'center',margin:5,}}>
                     <Text style={{fontSize:25,color:'#fff',fontWeight:'bold'}}>{selectItem.dataUser.name}</Text>
                     <Text style={{fontSize:20,color:'#fff', fontWeight:'300',paddingBottom:10,}}>@{selectItem.dataUser.pseudo}</Text>
                     <View style={{height:dim.width/1.1,width:dim.width/1.1,alignItems:'center', backgroundColor:'rgba(225, 225, 225, .5)',borderTopLeftRadius:20,borderTopRightRadius:20,justifyContent:'space-between'}}>
                         <Text style={{margin:5,fontSize:16,color:'#000',marginBottom:15, }}>{selectItem.dataUser.bio}</Text>
                         <View style={{marginBottom:15}}>
                            <ShowUserNetworks userNetworks={selectItem.dataUser.networks} />
                         </View>
                     </View>
                     </View>
                   
                            </ScrollView>
                        </View>
    )
}
export default ShowInfo;