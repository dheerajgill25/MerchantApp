import React from'react';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingPickups from './UpcomingPickups';
import SuccessfulDeliveries from './SuccessfulDeliveries';
import ReturnCancelation from './ReturnCancelation';

const Tab = createMaterialTopTabNavigator();


const TabNavigator = () => (
   
  <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
    <Tab.Screen name="Upcoming Pickups" component={UpcomingPickups} />
    <Tab.Screen name="Successful Deliveries" component={SuccessfulDeliveries} />
    <Tab.Screen name="Return Cancelation" component={ReturnCancelation} />
  </Tab.Navigator>
  
);

export default TabNavigator;

function MyTabBar({ state, descriptors, navigation }) {
  return ( 
      <View style={styles.tabSection}>
        {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
            };

            const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
            };
            // modify inputRange for custom behavior
            
            return (
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
               style={isFocused ? styles.focus_button : styles.button} >

                <Text style={isFocused ? styles.focus_textStyle : styles.TextStyle}> {label} </Text>
            </TouchableOpacity>
            );
        })}
    </View>
  );
}
const styles = StyleSheet.create({
    tabSection:{
        padding:10,
        flexDirection:'row',
        backgroundColor: '#333',
        height:67,
    },

    tab:{
        flex: 1 ,
        borderRightWidth:2,
        borderColor:'#fff',
        alignItems:'center',
        
        },
    button: {
        paddingTop:5,
        paddingBottom:5,
        backgroundColor: '#333',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRightWidth:2,
        borderColor:'#fff',
        flex: 1,
  },

    focus_button: {
        paddingTop:5,
        paddingBottom:5,
        backgroundColor: '#666',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRightWidth:2,
        borderColor:'#fff',
        flex: 1,
    },
    
    TextStyle:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize: 15
    },
    
    focus_textStyle:{
        color:'#fff',
        textAlign:'center',
        fontSize: 15
    }

    });
