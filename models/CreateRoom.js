export function createRoom(latitude,longitude){
    
    const lat = latitude.toString();
    const lon = longitude.toString();
    const latBefore = lat.split('.')[0];
    const latAfter = lat.split('.')[1];
    const lonBefore = lon.split('.')[0];
    const lonAfter = lon.split('.')[1];
    const room = latBefore+''+latAfter.slice(0,3)+lonBefore+lonAfter.slice(0,3);
    return room;
}
export function lastNumber(val){
    return val.toString().split('.')[1].slice(3,4)
}