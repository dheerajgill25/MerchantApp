import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar ,Button, TouchableOpacity, ScrollView} from 'react-native';

import styles from './FlatListStyle';

const PickupDetails = [
  {
    orderId: 'bd7acbea-c1b1',
    orderDate:'05 Jan 2021',
    orderTime:'03:24 PM',
    orderAmount:250,
  },
  {
    orderId: '3ac68afc-c605',
    orderDate:'05 Jan 2021',
    orderTime:'03:24 PM',
    orderAmount:250,
  },
  {
    orderId: '58694a0f-3da1',
    orderDate:'05 Jan 2021',
    orderTime:'03:24 PM',
    orderAmount:250,
  },
   {
    orderId: '58694a0f-3da2',
    orderDate:'05 Jan 2021',
    orderTime:'03:24 PM',
    orderAmount:250,
  },
  {
    orderId: '58694a0f-3da3',
    orderDate:'05 Jan 2021',
    orderTime:'03:24 PM',
    orderAmount:250,
  },
];
  
const Item = ({ orderId, orderDate, orderAmount, orderTime }) => (
  
  <View style ={styles.listItem}>
    <View style={{ flexDirection: 'row'}}>
    <Text style ={styles.order}> Delivered Order : {orderId}</Text>
     <Text style ={[styles.amount,{color:'green'}]}>${orderAmount}</Text>
     
    </View>
      <View style={{ flexDirection: 'row'}}>
      <Text style ={styles.date}> {orderDate}</Text>
      <Text style ={styles.time}> {orderTime}</Text>
     
     </View>
       
    </View>
);

const SuccessfulDeliveries = () => {
  const renderItem = ({ item }) => (
    <Item 
      orderId={item.orderId}
      orderDate={item.orderDate}
      orderTime={item.orderTime}
      orderAmount={item.orderAmount} />
  );

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style= {{marginHorizontal:17,}}> 
      <FlatList
        data={PickupDetails}
        renderItem={renderItem}
        keyExtractor={item => item.orderId}
      />
    </View>  
    </ScrollView>
    </SafeAreaView>
  );
}


export default SuccessfulDeliveries;

