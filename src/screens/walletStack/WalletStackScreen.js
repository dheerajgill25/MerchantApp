import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import WalletOutstanding from './WalletOutstanding';
import TabNavigator from './TabNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WalletStack = createStackNavigator();

const WalletStackScreen = ({navigation}) => (

<WalletStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#333'},
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#333" onPress={() => navigation.openDrawer()}></Icon.Button> ),
        headerRight: () => (
            <FontAwesome.Button name="bell" size={20} backgroundColor="#333" onPress={() => {}}></FontAwesome.Button>)
    }}>

        <WalletStack.Screen name="Main" component={Main} options={{title:'Wallet',}}/>
        
</WalletStack.Navigator>
);

export default WalletStackScreen; 

function Main() {
    return (
        <WalletOutstanding/>
        <TabNavigator/>
        
    );
};