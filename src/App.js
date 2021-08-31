/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Dimensions,LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './navigation/MainTabScreen';
import RootStackScreen from './screens/loginScreens/RootStackScreen';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from './images';
import {getuser, setuser} from './constants/tokenHandler'
import { AuthContext } from './components/context';
import BusinessDetailsScreen from './screens/loginScreens/BusinessDetailsScreen'
import NotificationWatcher from './services/pushnotification';
import { Permission, PERMISSIONS_TYPE } from './constants/Permission';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  //  const [userToken, setUserToken] = React.useState(null); 
  useEffect(()=>{
    Permission.requestMultiple([
      PERMISSIONS_TYPE.photo,
      PERMISSIONS_TYPE.camera,
    ]);
   
  },[])
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return { 
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  console.reportErrorsAsExceptions = false;
      LogBox.ignoreLogs([
        'Require cycle:'
      ])

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(token) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(token);
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
         setuser(userToken);
      } catch(e) {
        console.log(e);
      }
     
      dispatch({ type: 'LOGIN', token: userToken });
    },
     signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp:async(token) => {
      // setUserToken('fgkj');
      setIsLoading(false);
      const userToken = String(token);
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
         setuser(userToken);
      } catch(e) {
        console.log(e);
      }
      
      dispatch({ type: 'LOGIN', token: userToken });
    },
    
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
         setuser(userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#000'}}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1000"
                source={images.logo}
                style={{width: height_logo,height: height_logo}}
                resizeMode="stretch"
            />
        
      </View>
    );
  }
   
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    <NotificationWatcher/>
      { loginState.userToken !== null ? (
        <MainTabScreen />
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
