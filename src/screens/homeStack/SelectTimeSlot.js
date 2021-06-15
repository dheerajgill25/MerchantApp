import React, { useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, Text , TouchableOpacity,ActivityIndicator,FlatList,ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CalenderIcon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Card from '../../components/card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTimeSlot,createPickUp } from '../../services/createOrder';


const SelectTimeSlot = ({navigation,route}) => {
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState({
    pickupdate:'',
    timeSlot:'',
    deliveryInstructions:'',
    payTime:1,
    token: '',
  });
    const [list, setList] = React.useState({
    timeList:[],
  })
  var radio_props = [
      {label: 'Pay Now', value: 1 },
      {label: 'Pay Later', value: 2 }
    ];

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
    setList({timeList:arr});
    getToken();
  }, []);


    const selectionHandler =(index, fromTime, toTime)=>{
      setData({
        ...data,
        timeSlot:index
      })
    }

    const deliveryInstructionsInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                deliveryInstructions: val,
                check_deliveryInstructionsInputChange: true
            });
        } else {
            setData({
                ...data,
                deliveryInstructions: val,
                check_deliveryInstructionsInputChange: false
            });
        }
    }


    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      setDate(date);
      hideDatePicker();
    };

    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken')
        if(value !== null) {
          setData({
                ...data,
                token: value,   
            });
            
        }
      } catch(e) {
        console.log("token error",e)
      }
    }

    const getDate = () => {
      let tempDate = date.toString().split(' ');
      data.pickupdate =`${tempDate[0]}, ${tempDate[2]}-${tempDate[1]}-${tempDate[3]}`
      return date !== ''
        ? data.pickupdate
        : 'Select date';    
    };
    const payTimeInputChange =(val)=>{
      setData({
        ...data,
        payTime:val,
        check_payTimeInputChange: true
      });
    }

    function onCreatePickup(){
      if(data.token !== null){
      createPickUp(route.params.orderType,route.params.name,route.params.email,route.params.clientName,route.params.medicineName,route.params.quantity,
                  route.params.address1,route.params.address2,route.params.state,route.params.city,route.params.areaCode,route.params.phoneNo,route.params.paymentType,
                  route.params.cashAmount,route.params.paidPharmacy,route.params.paidIncuranceCompany,data.pickupdate,data.timeSlot,data.deliveryInstructions,data.payTime,data.token)
          .then((res) => {
      
          if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          } 
          else {
          alert(res.message)
          navigation.navigate('HomeScreen')
          }
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
      else{
        return (
        <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
        )
      }  

    };

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
      <ScrollView>
      <TouchableOpacity onPress={()=>showDatePicker()}>
        <View style= {styles.showdate} >
          <Text style={{flex:1, color:'#fff',}}>{getDate()}</Text>
            <CalenderIcon name="calendar-alt" color="#fff" size={25}/>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </TouchableOpacity>
          <View style={{justifyContent:'center'}}>

            {list.timeList.map((item,index)=>{
          return(
            <TouchableOpacity 
            onPress={() =>selectionHandler(index+1)}>
             <Card style={styles.cardHighlight}> 
              <View style= {{flexDirection:'row',}}>
                <Icon name="clock-time-eight-outline" color={'#f0f0f0'} size={20}/>
                <View style={{flex:1, alignItems:'center'}}>
                  <Text style={{color:'grey', fontSize:17, }}>{item.from_name} to {item.to_name}</Text>
                </View>
              </View>   
              </Card>   
            </TouchableOpacity>
          )
        })}
          </View>
        <View style={styles.action}>               
          <TextInput 
              placeholder="Add delivery instructions..."
              placeholderTextColor = "#fff"
              style={[styles.textInput,{fontSize:16,}]}
              autoCapitalize="none"
              onChangeText={(val) => deliveryInstructionsInputChange(val)}    
          />
        </View>  
          <View style={{marginVertical:15}}>
            <RadioForm
              radio_props={radio_props}
              intial={2}
              onPress={(value => {payTimeInputChange(value)})}
              buttonSize={12}
              buttonOuterSize={25}
              buttonColor={'#fff'}
              formHorizontal={false}
              labelHorizontal={true}
              animation={true}
              labelStyle={{fontSize: 17, color: '#fff', marginLeft:30, marginHorizontal:20}}
              selectedButtonColor= {'#fff'}
            />
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}> 
            <Button style={styles.submit} onPress={()=>onCreatePickup()}>
              <Text style={{color: '#fff', fontSize:17}}>Create Pickup</Text>     
            </Button>   
          </View>
        </ScrollView>  
      </View>
    );
  }
};

export default SelectTimeSlot;

const styles = StyleSheet.create({
container: {
    backgroundColor:'#000',
    flex: 1, 
    paddingHorizontal: 20,
  },
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    fontSize:16,
    paddingLeft: 10,
    color: '#fff',
  },
  showdate:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor:'#fff',
    paddingTop: 20,
    margin: 10,
  },
   cardHighlight:{
    marginVertical: 10,
    backgroundColor: '#292929',
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignSelf:'center', 
    justifyContent:'center' ,
    width: "100%",
  },
   action: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',    
  },
});
