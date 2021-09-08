import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderPickup from './OrderPickup';
import OrderDropOff from './OrderDropOff';

const Tab = createMaterialTopTabNavigator();

const OrderTabNav = ({navigation}) => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: true,
      activeTintColor: '#fff',
      inactiveTintColor: '#000',
      labelStyle: {
        fontSize: 15,
      },
      style: {
        position: 'absolute',
        top: 5,
        left: 20,
        right: 20,
        backgroundColor: '#666',
        pressColor: 'blue',
        borderRadius: 10,
        height: 50,
        borderBottomWidth: 0,
      },
      indicatorStyle: {
        backgroundColor: '#333',
        height: '100%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#fff',
      },

      // renderIndicator: () => null
    }}>
    <Tab.Screen name="Pickup" component={OrderPickup} />
    <Tab.Screen name="Drop Off" component={OrderDropOff} />
  </Tab.Navigator>
);

export default OrderTabNav;
