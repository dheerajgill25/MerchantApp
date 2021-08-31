import React, {useEffect, useRef} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import { setnotifiToken } from '../../constants/tokenHandler';

async function requestPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('enabled---', enabled);
  return enabled;
}

async function requestUserPermission() {
  const permissionGranted = await messaging().hasPermission();
  const isPermissionGranted =
    permissionGranted === messaging.AuthorizationStatus.AUTHORIZED ||
    permissionGranted === messaging.AuthorizationStatus.PROVISIONAL;

  let enabled = Platform.OS == 'android';
  if (!isPermissionGranted) {
    enabled = await requestPermission();
  }
  if (enabled) {
    messaging()
      .getToken()
      .then(token => {
        setnotifiToken(token);
        console.log('getToken', token);
      });
  }
}

const NotificationWatcher = ({}) => {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.debug('remoteMessage', remoteMessage);
      const {notification: {body, title} = {}, data} = remoteMessage;
      console.log(data);
      console.log('remoteMessage body', body);
      console.log('remoteMessage title', title);
      if (body && title) {
        PushNotification.localNotification({
          message: body,
          title,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <></>;
};

export default NotificationWatcher;
