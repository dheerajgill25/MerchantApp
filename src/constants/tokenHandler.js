let userToken = {};

  export const setuser =(value) =>  {
    userToken = value;
  };
  export const getuser =() => {
    return userToken;
  }

