
//const socketRef = useRef()

export let usersNear = [] 
let i = 0;

export const handleAddUserAround = (userAround) => {
    usersNear.push(userAround)
  };
  export const handleDelete = (userAround)=>{
      usersNear =  usersNear.filter((users) => {return users.dataUser.pseudo !== userAround.dataUser.pseudo})
    console.log('handleDelete userNear.length',usersNear.length,userAround.dataUser.pseudo);
    }
export const findOne = (userAround,user)=>{
    if(userAround.dataUser.pseudo !== undefined){
        if(usersNear.some(user=>user.dataUser.pseudo === userAround.dataUser.pseudo)|| usersNear.length > 10 || userAround.dataUser.pseudo === user.pseudo) return 0
        else{
          
          return 1
        }
          
      }else return 0;
}
  export const addUserAround = (userAround) => {
          console.log('addUser',userAround.dataUser.pseudo,usersNear.length);
          handleAddUserAround(userAround);
  }
  
  export const removeUserAround = (userAround) => {  
  if(userAround.dataUser.pseudo != undefined){
    handleDelete(userAround)
    }else return usersNear;
}




