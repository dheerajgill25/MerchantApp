import React,{useState,useEffect} from "react";
import { Text, StyleSheet, View, FlatList,ActivityIndicator,SafeAreaView, StatusBar,TouchableOpacity} from "react-native";
import {useFocusEffect} from '@react-navigation/native';
import {helpCenterList} from '../../services/updateProfile';
import Card from '../../components/card';
import Entypo from 'react-native-vector-icons/Entypo';
import Toaster from "../../services/toasterService";

const HelpCenterList = ({navigation}) =>{

  const[orderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value,setValue] =useState([])
    useFocusEffect(
        React.useCallback(() => {
        const intervalId= setInterval(()=> OrderListing(), 5000)
        // console.log('dropoff was focused');
        // // Do something when the screen is focused
        return () => {
            clearInterval(intervalId)
            // console.log('dropoff was unfocused');
            // Do something when the screen is unfocused
            // Useful for cleanup functions
        };
        }, [])
    );
        
    useEffect(() => {
     OrderListing()
    }, [])  
    

    function OrderListing(){
      helpCenterList()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
              setOrderList(res.help_center_list);
              setValue(res)
              };   
              setLoading(false);   
          }
          else {
              Toaster.show( res.message, 3000);
          }
        })     
    }


  const Item = ({orderID,contactNo,queryMsg,queryReply}) => (
    
    <View style={{paddingHorizontal:10, borderBottomColor:'#555',borderBottomWidth:1,width: '100%',paddingVertical: 15,}}>

    <View style={{flexDirection:'row'}}>
      <Text style={{color:'grey'}}>Order Id:  </Text>
      <Text style={{color:'#fff'}}>{orderID}</Text>
    </View>
    <View style={{flexDirection:'row',marginVertical:5}}>
      <Text style={{color:'grey',}}>Contact No:  </Text>
      <Text style={{color:'#fff'}}>{contactNo}</Text>
    </View>
    <View style={{flexDirection:'row',marginVertical:5}}>
      <Text style={{color:'grey',}}>Enquiry Details:  </Text>
      <Text style={{color:'#fff'}}>{queryMsg}</Text>
    </View>

      <View/>
    
      <View style={{flexDirection:'row',marginVertical:5}}>
        <Text style={{color:'grey',}}>Enquiry Reply:  </Text>
        <Text style={{color:'#fff'}}>{queryReply}</Text>
      </View>
    </View>  
 
  );


    const renderItem = ({ item }) => (
      <Item 
          orderID={item.orderID}
          contactNo={item.contact_no}
          queryMsg={item.query_msg}
          queryReply={item.query_reply}
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
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
    <StatusBar backgroundColor='#000' barStyle="light-content"/>
    {value.no_record =='0'?
      <View style= {{marginVertical:10,marginHorizontal:15}}> 
      <FlatList
          data={orderList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          inverted ={true}
          ListHeaderComponent ={<View style={{height:70}}></View>}
        />
      </View>  
    :
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'#fff'}}>Press add button for help</Text>
        </View>
    }
     <TouchableOpacity style={styles.floatingButton} onPress={()=>navigation.navigate('NewEnquiry')}>
        <Entypo name="plus" color={'white'} size={40}  ></Entypo>
    </TouchableOpacity>
    </SafeAreaView>
  )
  }
}

export default HelpCenterList;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
    paddingHorizontal: 20,
  },
  floatingButton:{
    backgroundColor: "#3B3B3B",
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    bottom: 85,
    right: 20,
    position: 'absolute'
  },
  viewWrapper:{
    flex:1,
    fontSize:15,
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignSelf: 'flex-end',
    },
});


 