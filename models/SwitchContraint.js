let invisible = 0;
let quickSwitch = 0
export const setInvisible = (val)=>{
    invisible = val;
    console.log('insible ',invisible);
}

export const getInvisible = ()=>{
    return invisible;
}
export const setQuickSwitch = (val)=>{
    quickSwitch = val;
    console.log('quick ',quickSwitch);
}

export const getQuickSwitch = ()=>{
    return quickSwitch;
}
