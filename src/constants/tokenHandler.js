let userToken = {};

  export const setuser =(value) =>  {
    userToken = value;
    console.log("value....",userToken)
  };
  export const getuser =() => {
    return userToken;
  }

let notifiToken ={};

  export const setnotifiToken =(value) =>  {
    notifiToken = value;
  };
  export const getnotifiToken =() => {
    return notifiToken;
    
  }