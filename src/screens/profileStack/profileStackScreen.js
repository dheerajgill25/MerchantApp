import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './profileScreen';
import editProfileScreen from './editProfileScreen';
import HelpCenterListScreen from './HelpCenterListScreen';
import NewEnquiry from './NewEnquiry';
import HelpCenterChat from './HelpCenterChat';



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
        <ProfileStack.Screen name="HelpCenterListScreen" component={HelpCenterListScreen} options={{title:'Help Center',}} />
        <ProfileStack.Screen name="NewEnquiry" component={NewEnquiry} options={{title:'New Enquiry',}} />
        <ProfileStack.Screen name="HelpCenterChat" component={HelpCenterChat} options={({route}) => ({
                title:route.params.orderID,
                headerBackTitleVisible: false,
        })}/>

</ProfileStack.Navigator>
);

export default ProfileStackScreen; 