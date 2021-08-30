import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar,Image,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native';
import images from '../../images';
import Card from '../../components/card';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Entypo';
import {dashboard,orderCancel} from '../../services/orders';
import Toaster from '../../services/toasterService';

const HomeScreen = ({navigation,route}) => {

  const[data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue]=useState("")

    useEffect(() => {
      OrderListing()
    }, [])  
    

    function OrderListing(){
      dashboard()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
              setValue(res)
              setData(res.next_pickup_list);
              };   
              setLoading(false);   
          }
          else {
              Toaster.show( res.message, 3000);
          }
        })     
    }

    const onCancelOrderPickup=(id)=>{
      orderCancel(id)  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
             alert(res.message)
             OrderListing()
              };   
              setLoading(false);   
          }
          else {
              Toaster.show( res.message, 3000);
          }
        })     
      
    }

    const Item = ({id,categoryName, categoryIcon, fromName, toName,orderDate, cancelButtonShow}) => (
  
    <Card style={styles.card}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'column',flex:0.8}}>  
          <Text style={{color:'#fff', fontSize:15}}>Next Scheduled Pickup</Text>
          <Text style={{color:'grey', fontSize:14, marginVertical:5}}>{categoryName}</Text>
        </View>
  
        <View style={{flexDirection:'column',alignItems:'flex-end',flex:0.2}}>
          <Image 
            source={{uri : categoryIcon}}
            style={{width:60, height:60, }}
            resizeMode="stretch"
          />
        </View>  
      </View>
  
          <Card style={styles.cardHighlight}>   
          <View style= {{flexDirection:'row'}}>
            <Icon name="back-in-time" color={'#f0f0f0'} size={20}/>
            <Text style={{color:'grey', fontSize:17}}>   {fromName} to {toName}</Text>
          </View>  
          </Card>
        <View style={{marginVertical:10}}>  
          <Card style={styles.cardHighlight}>     
            <Text style={{color:'grey', fontSize:13}}>{orderDate}</Text>
          </Card>
        </View>  
        {cancelButtonShow =='0'?
              <View/>
            :
             <Button style={styles.redButton} onPress={() => {onCancelOrderPickup(id)}}>
                <Text style={{color: '#fff', fontSize:16}}>Cancel Pickup</Text>     
            </Button> 
        }
    </Card>
  );


  const renderItem = ({ item }) => (
   <Item 
      id={item.id}
      categoryName={item.category_name}
      categoryIcon={item.category_icon}
      fromName={item.from_name} 
      toName={item.to_name}
      orderDate={item.ord_date}
      cancelButtonShow={item.cancel_btn}       
      />
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
        <StatusBar backgroundColor='#000' barStyle="light-content"/>
        <Image 
          source={images.deliveryTruck}
          style={{width:'100%',}}
          resizeMode="stretch"
        />
        {value.no_record =='0'?
            <View style={{flex:1}}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                // ListFooterComponent ={<View style={{height:70}}></View>}
              />
              </View>
          :
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff'}}>No Upcoming Pickups Scheduled</Text>
              </View>
        }
        
        <View style= {{flexDirection:'row', alignSelf:'center',flex:0.5}}>
          <Button style={styles.button} onPress={() => navigation.navigate('PriorityOrder')}>
                <Text style={{color: '#fff', fontSize:16}}>Priority Pickup</Text>     
          </Button> 
           <Button style={styles.button} onPress={() => navigation.navigate('StandardOrder')}>
                <Text style={{color: '#fff', fontSize:16}}>Regular Order</Text>     
          </Button>
        </View>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
  },
  card: {
    flex:1,
    backgroundColor: '#333333',
    marginVertical:20,
    marginHorizontal: 15,
  }, 
  cardHighlight:{
    backgroundColor: '#292929',
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignSelf:'center', 
    justifyContent:'center' 
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
  button:{
    borderColor: '#fff',
    backgroundColor:'grey',
    width:'40%',
  }
});
