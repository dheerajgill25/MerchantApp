import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler'

export const getWalletDetails =() => {
    token = null;
    token = getuser()
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.WALLET_DETAILS;
    return fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
          },
    })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("error...",error);
    });
};

export const reOrder = (orderId) =>{
  token = null;
  token = getuser() 
  const URL =Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.RE_ORDER;
  let formdata = new FormData();
  formdata.append("order_id", orderId)
  return fetch(URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      body: formdata
  })
  .then((response) => response.json()).then((json) => {
      console.log("json",json)
      return json
  }).catch((error) => {
      console.error("error",error);
  });
}