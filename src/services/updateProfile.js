import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';

export const profileImage= (image) =>{

    token = null;
    token = getuser() 
    console.log("image",image)
   const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.PROFILE_IMAGE_UPDATE;
    let formdata = new FormData();
     if(image!= "") {
        formdata.append("profile_image", {
            uri: image.path,
            type: "image/jpeg",
            name: image.filename || `filename${1}.jpg`,
        });
    }
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
};

export const getProfile= () =>{
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.PROFILE_GET;
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
}

export const updateEditProfile= (name, contactNo,email,address1,address2,state,city,areaCode,businessName,registrationNo,businessType,
                                bussinessDomain,designation,facebook,linkedin,twitter,instagram) =>{

    token = null;
    token = getuser() 
    
   const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.PROFILE_UPDATE;
    let formdata = new FormData();

      formdata.append("full_name", name)
      formdata.append("contact_no",contactNo)
      formdata.append("email", email)
      formdata.append("adr_street",address1)
      formdata.append("adr_building",address2)
      formdata.append("adr_state_id",state)
      formdata.append("adr_city",city)
      formdata.append("adr_area_code",areaCode)
      formdata.append("bussiness_name", businessName)
      formdata.append("registration_no",registrationNo)
      formdata.append("business_type", businessType)
      formdata.append("business_category_id",bussinessDomain)
      formdata.append("designation",designation)
      formdata.append("mer_facebook", facebook)
      formdata.append("mer_linkedin",linkedin)
      formdata.append("mer_twitter", twitter)
      formdata.append("mer_instagram",instagram)
      console.log('formdata', formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
};

export const helpCenterList = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.HELP_CENTER_LIST; 
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

export const newEnquiry = (orderId, contactNo,enquiry) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.NEW_ENQUIRY;
      token = null;
      token = getuser()
    let formdata = new FormData();
    formdata.append("orderID", orderId)
    formdata.append("contact_no",contactNo)
    formdata.append("query_msg",enquiry)
    console.log(formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error('error',error);
    });
}