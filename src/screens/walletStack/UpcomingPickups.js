import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView ,ActivityIndicator} from 'react-native';
import styles from './FlatListStyle';
import {getWalletDetails} from '../../services/wallet'


const UpcomingPickups = () => {

    const[data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [value, setValue]=useState("");

    useEffect(() => {
     OrderListing()
    }, [])  
    

    function OrderListing(){
      getWalletDetails()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
              setData(res.upcoming_pickups);
               setValue(res)
              };   
              setLoading(false);   
          }
          else {
              ToastAndroid.showWithGravityAndOffset(
              res.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
              );
          }
        })     
    }

    const Item = ({ orderId, orderDate, orderAmount, }) => (
    
    <View style ={styles.listItem}>
      <View style={{ flexDirection: 'row'}}>
      <Text style ={styles.order}> Pickup Order : {orderId}</Text>
      <Text style ={[styles.amount,{color:'green'}]}>${orderAmount}</Text>
      
      </View>
        <View style={{ flexDirection: 'row'}}>
        <Text style ={styles.date}> {orderDate}</Text>
      </View>

      </View>
  );
  const renderItem = ({ item }) => (
    <Item 
      orderId={item.orderID}
      orderDate={item.transaction_date}
      orderAmount={item.order_amount} />
  );


  if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
       <StatusBar backgroundColor='#000' barStyle="light-content"/>
        <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  else{

  return (
    <SafeAreaView style={styles.container}>
    <View style= {{marginHorizontal:17,}}> 
     {value.no_record_upcoming_pickups =='0'?
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent ={<View style={{height:70}}></View>}
      />
      :
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff'}}>No Returned or Canceled Order</Text>
              </View>
        } 
    </View>  
    </SafeAreaView>
  );
  }
}


export default UpcomingPickups;

