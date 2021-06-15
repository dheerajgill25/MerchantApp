import React from'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingPickups from './UpcomingPickups';
import SuccessfulDeliveries from './SuccessfulDeliveries';
import ReturnCancelation from './ReturnCancelation';
import Animated from 'react-native-reanimated';


const Tab = createMaterialTopTabNavigator();


const TabNavigator = () => (
   
  <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
    <Tab.Screen name="Upcoming Pickups" component={UpcomingPickups}  />
    <Tab.Screen name="Successful Deliveries" component={SuccessfulDeliveries} />
    <Tab.Screen name="Return Cancelation" component={ReturnCancelation} />
  </Tab.Navigator>
  
);

export default TabNavigator;

function MyTabBar({ state, descriptors, navigation, position }) {
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
                style={ styles.tab }
            >
                <Animated.Text style= {styles.tabText}>{label}</Animated.Text>
            </TouchableOpacity>
            );
        })}
    </View>
  );
}
const styles = StyleSheet.create({
    tabSection:{
        flexDirection:'row',
        paddingVertical: 10,
        backgroundColor: '#333',
    },

    tab:{
        flex: 1 ,
        borderRightWidth:2,
        borderColor:'#fff',
        alignItems:'center',
        
        },

    tabText:{
        fontSize:15,
        color:'#fff',
        textAlign:"center",
    },

    });
