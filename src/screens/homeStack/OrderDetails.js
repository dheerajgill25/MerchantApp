import React,{useState,useEffect} from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image,SafeAreaView, ActivityIndicator} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {details,orderCancel} from '../../services/orders';
import Button from '../../components/button';

const OrderScreen = ({navigation,route}) => {
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = useState(true); 

    useEffect(() => { 
        OrderDetail()

    }, [])  
    

    function OrderDetail(){
      details(route.params.id)  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
              setData(res.orders_detail);
                
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

    const onOrderCancel=(id)=>{
        orderCancel(id)  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
             alert(res.message) 
             navigation.navigate('HomeScreen')
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

    if (isLoading){
    return (
    <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
        <ActivityIndicator size="large" color="#fff"/>
    </View>
    )
  }
  
  else{

  return  (
      
    <SafeAreaView style={styles.container}>
        <ScrollView style={{marginBottom:60}}>
         <View>
             <Text style={{fontSize: 25, color: '#fff',}}>Order booked successfully</Text>
             <Text style={{fontSize: 15, color: '#fff', marginVertical:15}}>ORDER ID: {data.orderID}</Text>
           
             <Text style={{fontSize: 22, color: '#fff',}}>Delivery Details</Text>
             <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{ color: 'grey', marginTop: 17}}>STATUS</Text>
                        <Text style={{ color: '#fff', marginTop: 5}}>{data.order_status}</Text>
                        <Text style={{ color: 'grey', marginTop: 17}}>CUSTOMER NAME</Text>
                        <Text style={{ color: '#fff', marginTop: 5}}>{data.client_name}</Text>
                    </View>
                    <View style={styles.qr}>
                        <Image style={styles.img2} source={{uri: data.order_qr_img}}/>
                    </View>
            </View>
            <View style={{marginTop:10}}>
             <Text style={{ color: 'grey', marginTop: 7}}>ADDRESS</Text>
             <Text style={{ color: '#fff', marginTop: 5}}>{data.client_address}</Text>
             <Text style={{ color: 'grey', marginTop: 17}}>CONTACT NUMBER</Text>
             <Text style={{ color: '#fff', marginTop: 5}}>{data.client_contact_no}</Text>
             <Text style={{ color: 'grey', marginTop: 17}}>LOCATION</Text>
             </View>
             <Image style={styles.img} source={{uri: data.location}}/>
            {data.cancel_btn=='0'?
                <View/>
            :
             <Button style={styles.redButton} onPress={() => {onOrderCancel(data.id)}}>
                <Text style={{color: '#fff', fontSize:16}}>Cancel Order</Text>     
            </Button> 
            }
         </View>
    </ScrollView>
   </SafeAreaView> 
  );
  }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#000',
        flex: 1,
        padding:15 ,
    },
    img:{
        marginTop: 15,
        height: 150,
        width: '100%',
        borderRadius: 15,
    },
    qr:{
        alignSelf: 'flex-end',
        flexDirection: 'column',
    },
    img2:{
        height: 120,
        width: 120,
    },
    redButton:{
        borderColor: 'red',
        backgroundColor:'red',
        width:'48%',
        alignSelf:'center', 
        justifyContent:'center',
        padding: 8,
        height:45,
    },
    
});

export default OrderScreen;
