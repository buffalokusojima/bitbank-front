import { refreshToken } from '../AuthStateApp';
import axios from 'axios';
import {APP_APIGATEWAY_ENDPOINT} from '@env'
console.log(APP_APIGATEWAY_ENDPOINT)
axios.defaults.baseURL = APP_APIGATEWAY_ENDPOINT;

const get = async (url:string, idToken=null) => {
  axios.defaults.withCredentials = false;
  console.log(`[GET] ${url}`);

  let getProps;
  if (idToken)
    getProps = [url, { headers: { Authorization: idToken }}];
  else getProps = [url];

  try {
    return await axios.get(...getProps);
  } catch (error) {
    const message = error.response?.data?.message;
    if (error?.response?.status === 401) {
      getProps[1].headers.Authorization = await refreshToken();
      return await axios.get(...getProps);
    }else{
        console.error(error)
    }
  }
}

const post = async (url:string, idToken=null, data:object) => {
  axios.defaults.withCredentials = false;
  console.log('[POST]', url, data);

  let postProps;
  if (idToken)
    postProps = [url, data, { headers: { Authorization: idToken } }];
  else postProps = [url, data];

  try {
    return await axios.post(...postProps);
  } catch (error) {
    const message = error.response?.data?.message;
    if (error.response.status === 401) {
      postProps[2].headers.Authorization = await refreshToken();
      return await axios.post(...postProps);
    }
  }
}

async function statePost(url, idToken, data, callback, nextState) {
  callback(nextState);
  try {
    const result = await post(url, idToken, data);
    if (!result.data.success) callback(!nextState);
  } catch {
    callback(!nextState);
  }
}

export { axios, get, post, statePost };
