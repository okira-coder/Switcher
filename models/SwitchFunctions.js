export const contraintsBeforeSwitch = (user,switcher)=>{
    if(switcher.dataUser.pseudo !== undefined&&switcher.dataUser.pseudo !== user.pseudo&&user.switches.length < 10){
        console.log('before filter user.switches: ',user.switches.length,user.switches.some(user=>user.dataUser.pseudo === switcher.dataUser.pseudo),'add',switcher.dataUser.pseudo)
        //console.log('before filter user.switches: ',user.switches.length,user.switches.some(user=>user.dataUser.pseudo === switcher.dataUser.pseudo,'add ',switcher.dataUser.pseudo,' test'))
        if(user.switches.some(user=>user.dataUser.pseudo === switcher.dataUser.pseudo)){
            user.switches =  user.switches.filter((users) => {return users.dataUser.pseudo !== switcher.dataUser.pseudo})
        }
        console.log('after filter user.switches: ',user.switches.length,user.switches.some(user=>user.dataUser.pseudo === switcher.dataUser.pseudo),'add',switcher.dataUser.pseudo)
        return 1
    }else return 0
}
export const addSwitcher = (item,user)=>{
    console.log('addSwitcher',item.dataUser.pseudo)
    const switchers = user.switches.concat(item);
    user.switches = switchers
}
export const waitingContraint = (user,waiter)=>{
    if(waiter.dataUser.pseudo !== undefined&&waiter.dataUser.pseudo !== user.pseudo&&user.switches.length < 10){
        if(user.waiting.some(user=>user.dataUser.pseudo === waiter.dataUser.pseudo)){
            user.waiting =  user.waiting.filter((users) => {return users.dataUser.pseudo !== waiter.dataUser.pseudo})
        }
        return 1
    }else return 0
}
