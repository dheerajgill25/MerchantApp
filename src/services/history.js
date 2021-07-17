
import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';


export const pickup = () => {
    token = null;
    token = getuser()
    console.log(token)
  const URL = Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.PICKUP_HISTORY; 
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
      console.error("error here", error );
    });
};


export const dropOff = () => {

    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.DROP_OFF; 
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
      console.error(error);
    });
};