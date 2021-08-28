import { get } from './utils';

const getOrders = async (idToken:string) => {
    const path = `/getOrders`;
    const result = await get(path,idToken);
    return result.data;
}

const getSpecialOrders = async (idToken:string) => {
    const path = `/getStopOrders`;
    const result = await get(path,idToken);
    return result.data;
}

const getAssets = async (callback:() => void, idToken:string) => {
    const path = `/getAssets`;
    const result = await get(path,idToken);
    callback(result.data);
}

export {getOrders, getAssets, getSpecialOrders}