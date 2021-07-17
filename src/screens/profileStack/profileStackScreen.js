import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './profileScreen';
import editProfileScreen from './editProfileScreen';



const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
<ProfileStack.Navigator screenOptions={{
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
        <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{title:'Your Profile',}} />
        <ProfileStack.Screen name="editProfileScreen" component={editProfileScreen} options={{title:'Edit Profile',}} />
        

</ProfileStack.Navigator>
);

export default ProfileStackScreen; 