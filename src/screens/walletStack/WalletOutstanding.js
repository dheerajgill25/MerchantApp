import React,{useState,useEffect} from 'react';
import { 
  View, 
  Text,
  StatusBar,
  TextInput, 
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions, 
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import Card from '../../components/card';
import {getWalletDetails} from '../../services/wallet';
import Button from '../../components/button';
import Toaster from 'services/toasterService';


const WalletOutstanding = ({navigation}) => {

    const[data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
     OrderListing()
    }, [])  
    

    function OrderListing(){
      getWalletDetails()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message);
                Toaster.show(res.message, 3000);
              }
            else {
              setData(res);
              };   
              setLoading(false);   
          }
          else {
              Toaster.show(res.message, 3000);
          }
        })     
    }

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
        <StatusBar backgroundColor='#000' barStyle="light-content"/>
        <View style={{ flexDirection: 'row',backgroundColor:'#333',justifyContent: 'space-between',height:50, alignItems:'center'}}>  
          <View style={{marginHorizontal:15,flexDirection:'column'}}>               
            <Text style= {{fontSize: 18, color:'grey', }}>Total Transactions</Text>
          </View>  

          <View style={{marginHorizontal:15,flexDirection:'column'}}>
            <Text style= {{fontSize: 20, color: '#fff' , }}>
              ${data.total_transaction}</Text>
          </View>
        </View>

        <Card style={styles.card}>
        
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>

            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize: 17,color: 'grey',}}>Total Outstanding</Text>
            <Text style={{fontSize: 15,color: 'grey',marginVertical:7}}>Next Payment Cycle</Text>
            <Text style={{fontSize: 18,color: 'grey',marginVertical:4}}> {data.next_cycle_date}</Text>
            </View>

            <View style={{flexDirection:'column'}}>
              <Text style= {{fontSize: 21, color: '#fff' ,textAlign: 'right', }}>${data.total_outstanding}</Text>
            </View>

          </View>

          <Button style={styles.submit} onPress={() => {}}>
                <Text style={{color: '#fff', fontSize:16}}>Pay Now</Text>     
          </Button> 
        </Card>
    </SafeAreaView>  
    );
  }
};


export default WalletOutstanding;

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: '#333',
    margin:20,
  }, 
  submit:{
    borderColor: '#fff',
    width:'55%',
    alignSelf:'center', 
    justifyContent:'center',
    padding: 8,
    height:45,
  },
});