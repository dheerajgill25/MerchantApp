import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler'

export const dashboard =() => {
    token = null;
    token = getuser()
    const URL = Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.DASHBOARD;
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




export const getTimeSlot = () => {
  const URL = Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.TIME_SLOT_LIST; 
  return fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

export const createPickUp =(orderType,name,clientEmail,medicineName,quantity,address1,address2,state,city,areaCode,
                            phoneNo,paymentType,cashAmount,paidPharmacy,paidIncuranceCompany,pickupdate,timeSlot,
                            deliveryInstructions) =>{
  
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.ORDER_CREATE;
  let formdata = new FormData();
    formdata.append("order_type",orderType)
    formdata.append("client_name",name)
    formdata.append("client_email", clientEmail)
    formdata.append("medicine_name",medicineName)
    formdata.append("qty",quantity)
    formdata.append("street_addr", address1)
    formdata.append("building_addr",address2)
    formdata.append("state",state)
    formdata.append("city", city)
    formdata.append("area_code",areaCode)
    formdata.append("primary_phone",phoneNo)
    formdata.append("cash_collection_type", paymentType)
    formdata.append("cash_amount",cashAmount)
    formdata.append("cash_pharmacy_amount",paidPharmacy)
    formdata.append("cash_company_amount", paidIncuranceCompany)
    formdata.append("order_date",pickupdate)
    formdata.append("order_timeslot_id",timeSlot)
    formdata.append("delivery_instruction", deliveryInstructions)
    console.log('form data...',formdata)
  return fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        body: formdata  
        
    })
    .then((response) => response.json()).then((json) => {
        console.log("resposne",json)
        return json
    }).catch((error) => {
        console.error(error);
    });
}

export const details = (orderId) =>{
  token = null;
  token = getuser() 
  const URL =Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.ORDER_DETAIL;
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
export const orderCancel = (orderId) =>{
  token = null;
  token = getuser() 
  const URL =Constants.BASE_URL+Constants.MERCHANT_ORDER+Constants.CANCEL_ORDER;
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