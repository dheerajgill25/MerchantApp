import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import PriorityOrder from './PriorityOrder';
import StandardOrder from './StandardOrder';
import SelectTimeSlot from './SelectTimeSlot';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        // headerLeft: () => (
        //    <Icon.Button name="ios-menu" size={25} backgroundColor="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
        // ),

        headerRight: () => (
            <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() => {}}></FontAwesome.Button>
        )
    }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:'Hi user',}} />
        <HomeStack.Screen name="PriorityOrder" component={PriorityOrder} options={{title:'Priority Order Details',}} />
        <HomeStack.Screen name="StandardOrder" component={StandardOrder} options={{title:'Standard Order Details',}} />
        <HomeStack.Screen name="SelectTimeSlot" component={SelectTimeSlot} options={{title:'Select Time Slot',}} />
</HomeStack.Navigator>
);

export default HomeStackScreen; 
