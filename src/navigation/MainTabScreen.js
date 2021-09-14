import React from 'react';
import  { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderHistory from '../screens/orderHistoryStack/OrderHistoryScreen';
import ProfileStackScreen from '../screens/profileStack/profileStackScreen';
import WalletStackScreen from '../screens/walletStack/WalletStackScreen';
import HomeStackScreen from '../screens/homeStack/homeStackScreen';
import { phoneHeight } from '../constants/phoneHeight';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => (
   
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#fff',
    style:{
      position:'absolute',
      bottom:phoneHeight() < 640 ?10 :25,
      left:20,
      right: 20,
      backgroundColor:'#333',
      borderRadius: 50,
      height:50,
      borderTopWidth: 0,
      }
    }}
  >
    
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({  color }) => (
          <Icon name="ios-home" color={color} size={26} style={{ marginTop: phoneHeight() < 640 ?0 : 30 , height: 28 }} />
          ),
            }}
      />
      <Tab.Screen
        name="WalletStack"
        component={WalletStackScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Icon name="wallet" color={color} size={26} style={{ marginTop: phoneHeight() < 640 ?0 : 30 , height: 28 }} />
          ),
          
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarLabel: 'OrderHistory',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" color={color} size={26} style={{ marginTop: phoneHeight() < 640 ?0 : 30 , height: 28 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({  color }) => (
          <Icon name="ios-person" color={color} size={26} style={{ marginTop: phoneHeight() < 640 ?0 : 30 , height: 28 }} />
          ),
            }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;
