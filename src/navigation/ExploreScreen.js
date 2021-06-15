import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, Alert,TouchableOpacity,ActivityIndicator,ToastAndroid } from 'react-native';
import { getTimeSlot } from '../services/createOrder';

const ExploreScreen = () => {
const [isLoading, setLoading] = useState(true);  
const [data, setData] = React.useState({
    date:'',
    timeSlot:'',
    deliveryInstructions:'',
    payTime:1,
  });
  const [list, setList] = React.useState({
    timeList:[],
  })


  useEffect(() =>{
    getTimeSlot()  
    .then((res) => {
      if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          }
        else {
          setList({
            timeList:res.list
          })
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
  let arr = list.timeList.map((item,index)=>{
    item.isSelected = false
    return{...item};
  })
    setList({timeList:arr });
  }, []);


    const selectionHandler =(index, fromTime, toTime)=>{
      setData({
        ...data,
        timeSlot:index
      })
    }
     alert(data.timeSlot)
    if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  else{
    return (
      <View style={styles.container}>
        <Text style ={{color :'#fff'}}>Explore Screen</Text>
        {list.timeList.map((item,index)=>{
          return(
            <TouchableOpacity style= {{backgroundColor:'grey',  padding:10, margin:10,width:'80%',}}
            onPress={() =>selectionHandler(index+1, item.from_name, item.to_name)}>

              <Text>{item.from_name} to {item.to_name}</Text>  
            
            </TouchableOpacity>
          )
        })}
        {/* <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        /> */}
      </View>
    );
  }  
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'#000',
  },
});
