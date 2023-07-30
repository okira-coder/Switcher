import { useNavigation } from "@react-navigation/native";
import client from "../api/client";
export async function userLogout (token){
    const {navigation} = useNavigation()
        try {
          await client.post('/logout',
          {
            headers: {
                Accept: 'application/json',
                'content-Type': 'multipart/form-data',
               session : `JWT ${token}`,
               }
            }
        ).then((res)=>{
            console.log('Logout res.data:', res.data.message,'req.headers.session: ',req.headers.session);
            if(res.data.success){
                navigation.dispatch(
                    StackActions.replace('Welcome', {
                    })
                  );
            }
            else{
            console.log('Logout res.data:', res.data.message);
          }
        })
        
        
        } catch (error) {
          
        }
        
}
