import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './profileScreen';
import editProfileScreen from './editProfileScreen';
import HelpCenterList from './HelpCenterList';
import NewEnquiry from './NewEnquiry';


const ProfileStack = createStackNavigator();

const ProfileStackScreen = (props,{navigation}) => (
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
            <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() =>  props.navigation.navigate('Notifications')}></FontAwesome.Button>
        )
    }}>
        <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{title:'Your Profile',}} />
        <ProfileStack.Screen name="editProfileScreen" component={editProfileScreen} options={{title:'Edit Profile',}} />
        <ProfileStack.Screen name="HelpCenterList" component={HelpCenterList} options={{title:'Help Center',}} />
        <ProfileStack.Screen name="NewEnquiry" component={NewEnquiry} options={{title:'New Enquiry',}} />

</ProfileStack.Navigator>
);

export default ProfileStackScreen; 