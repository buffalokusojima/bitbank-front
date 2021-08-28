import {post} from './utils'

const submitOrder = async (callback:() => void, order:object, idToken:string) => {
    const path = `/controlOrder`;
    const result = await post(path, idToken, order);
    callback(result?.data);
}

const submitSpecialOrder = async (callback:() => void, order:object, idToken:string) => {
    const path = `/controlSpecialOrder`;
    const result = await post(path, idToken, order);
    callback(result.data);
}

const cancelNormalOrder = async (callback:() => void, order:object, idToken:string) => {
    const path = `/cancelOrder`;
    const result = await post(path, idToken, order);
    callback(result.data);
}

export {submitOrder, submitSpecialOrder, cancelNormalOrder }