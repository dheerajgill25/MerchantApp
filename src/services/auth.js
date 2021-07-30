import * as Constants from "../constants/urls";
import {getuser,getnotifiToken} from '../constants/tokenHandler';


export const emailCheck = (emailId) => {
    
   const URL = Constants.BASE_URL+Constants.BASIC_LIST+Constants.EMAIL_EXIST;
    let formdata = new FormData();
    formdata.append("email", emailId)
    console.log("check email",formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        console.log("res",json)
        return json
    }).catch((error) => {
        console.error("email",error);
    });
}

export const signup = (fullName, contactNo, emailId, passwordCheck, businessName, registrationNo, businessType, ownerName,
                        designation,businessDomain, address1, address2, state,city, areaCode, businessContactNo, facebook, linkedin,
                        twitter, instagram) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.SIGN_UP;
    deviceToken = null;
    deviceToken = getnotifiToken()
    let formdata = new FormData();
    formdata.append("full_name", fullName)
    formdata.append("contact_no",contactNo)
    formdata.append("email",emailId)
    formdata.append("password",passwordCheck)
    formdata.append("bussiness_name",businessName)
    formdata.append("registration_no",registrationNo)
    formdata.append("business_type",businessType)
    formdata.append("owner_name",ownerName)
    formdata.append("designation",designation)
    formdata.append("business_category_id",businessDomain)
    formdata.append("adr_street",address1)
    formdata.append("adr_building",address2)
    formdata.append("adr_state_id",state)
    formdata.append("adr_area_code",areaCode)
    formdata.append("adr_city",city)
    formdata.append("business_contact_no",businessContactNo)
    formdata.append("mer_facebook",facebook)
    formdata.append("mer_linkedin",linkedin)
    formdata.append("mer_twitter",twitter)
    formdata.append("mer_instagram",instagram)
    formdata.append("app_reg_token",deviceToken)
    console.log('formdata...',formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
}

export const signin = (emailId, passwordCheck) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.Sign_In;
    deviceToken = null;
    deviceToken = getnotifiToken()
    let formdata = new FormData();
    formdata.append("email", emailId)
    formdata.append("password",passwordCheck)
    formdata.append("app_reg_token",deviceToken)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
}

export const resetPassword = (emailId) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.Reset_Password;

    let formdata = new FormData();
    formdata.append("email", emailId)
    console.log(formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
}

export const getStateList =() => {
    
   const URL = Constants.BASE_URL+Constants.BASIC_LIST+Constants.STATE_LIST;
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

export const logout = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.LOGOUT;
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

export const notification = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.NOTIFICATIONS; 
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

