import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import PriorityOrder from './PriorityOrder';
import StandardOrder from './StandardOrder';
import SelectTimeSlot from './SelectTimeSlot';
import OrderDetails from './OrderDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Notifications from './Notifications';
import ReOrderScreen from './ReOrderScreen'

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
            <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() =>navigation.navigate('Notifications')}></FontAwesome.Button>
        )
    }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:'',}} />
        <HomeStack.Screen name="PriorityOrder" component={PriorityOrder} options={{title:'Priority Order Details',}} />
        <HomeStack.Screen name="StandardOrder" component={StandardOrder} options={{title:'Standard Order Details',}} />
        <HomeStack.Screen name="SelectTimeSlot" component={SelectTimeSlot} options={{title:'Select Time Slot',}} />
        <HomeStack.Screen name="OrderDetails" component={OrderDetails} options={{title:'',}} />
        <HomeStack.Screen name="ReOrderScreen" component={ReOrderScreen} options={{title:'',}}/>
        <HomeStack.Screen name="Notifications" component={Notifications} options={{title:'Notifications',}}/>
</HomeStack.Navigator>
);

export default HomeStackScreen; 
