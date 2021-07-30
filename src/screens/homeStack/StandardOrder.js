import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,SafeAreaView,StatusBar,ScrollView, TextInput, TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import styles from './homeStyle';
import { Picker } from '@react-native-picker/picker';
import {getClientList} from '../../services/orders'; 
import { getStateList } from "../../services/auth";

const StandardOrder = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true); 
    const [data, setData] = useState({
      orderType:2,
      name:'',
      clientEmail : '',
      medicineName:'',
      quantity:'',
      address1:'',
      address2:'',
      state:'',
      areaCode:'',
      city:'',
      phoneNo:'',
      paymentType:1,
      cashAmount:0,
      paidPharmacy:'',
      paidIncuranceCompany:'',
    });
    const [clientList, setClientList]= React.useState([]);
  const [businessTypeList, setBusinessTypeList] = useState([]);
    const [designationList, setDesignationList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [areaCodeList, setAreaCodeList] = useState([]);

  useEffect(() =>{

    ClientList()

    StateList()

  }, []);

  function ClientList(){
      getClientList()  
    .then((res) => {
      if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          }
        else {
          setClientList(res.list);
          setLoading(false);
          };  
        
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

  function StateList(){
     getStateList()  
      .then((res) => {
        if (res.code == 200){
            if (res.success == "false"){
                alert(res.message)
            }
          else {
            setStateList(res.state_list);
            setCityList(res.city_list)
            setAreaCodeList(res.area_code_list)
            setLoading(false);
            };  
          
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

  const validate = (text) => {

    if (text != 0) {
        return true;
    }
    else { 
        return false;
    }
  }



    const toggleModalVisibility = () => {
      setModalVisible(!isModalVisible);
    };
    var radio_props = [
      {label: 'Cash to be collected', value: 1 },
      {label: 'Prepaid', value: 2 }
    ];

    const paidPharmacyInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            paidPharmacy: val,
            check_paidPharmacyInputChange: true,
        });
    } else {
        setData({
            ...data,
            paidPharmacy: val,
            check_paidPharmacyInputChange: false,
        });
    }
  }

  const paidIncuranceCompanyInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            paidIncuranceCompany: val,
            check_paidIncuranceCompanyInputChange: true,
        });
    } else {
        setData({
            ...data,
            paidIncuranceCompany: val,
            check_paidIncuranceCompanyInputChange: false,
        });
    }
  }
  const nameInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            name: val,
            check_nameInputChange: true
        });
    } else {
        setData({
            ...data,
            fullName: val,
            check_nameInputChange: false
        });
    }
  }

  const medicineNameInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            medicineName: val,
            check_medicineNameInputChange: true
        });
    } else {
        setData({
            ...data,
            medicineName: val,
            check_medicineNameInputChange: false
        });
    }
  }

  const quantityInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            quantity: val,
            check_quantityInputChange: true
        });
    } else {
        setData({
            ...data,
            quantity: val,
            check_quantityInputChange: false
        });
    }
  }

  const address1InputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            address1: val,
            check_address1InputChange: true
        });
    } else {
        setData({
            ...data,
            address1: val,
            check_address1InputChange: false
        });
    }
  }

  const address2InputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            address2: val,
            check_address2InputChange: true
        });
    } else {
        setData({
            ...data,
            address2: val,
            check_address2InputChange: false
        });
    }
  }

  const stateInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            state: val,
            check_stateInputChange: true
        });
    } else {
        setData({
            ...data,
            state: val,
            check_stateInputChange: false
        });
    }
  }

  const areaCodeInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            areaCode: val,
            check_areaCodeInputChange: true
        });
    } else {
        setData({
            ...data,
            areaCode: val,
            check_areaCodeInputChange: false
        });
    }
  }

  const cityInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            city: val,
            check_cityInputChange: true
        });
    } else {
        setData({
            ...data,
            city: val,
            check_cityInputChange: false
        });
    }
  }

  const phoneNoInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            phoneNo: val,
            check_phoneNoInputChange: true
        });
    } else {
        setData({
            ...data,
            phoneNo: val,
            check_phoneNoInputChange: false
        });
    }
  }
  const clientlistInputchange =(val)=>{
    if( val.length !== 0 ) {
        setData({
            ...data,
            clientEmail: val,
            check_clientNameInputChange: true
        });
    } else {
        setData({
            ...data,
            clientEmail: val,
            check_clientNameInputChange: false
        });
    }
  }
  const paymentTypeInputChange =(val)=>{
    setData({
      ...data,
      paymentType:val,
      check_paymentTypeInputChange: true
    });
   
  }

  function onNavigate() {
    navigation.navigate('SelectTimeSlot',{orderType:data.orderType, name:data.name,clientEmail:data.clientEmail,medicineName:data.medicineName,quantity:data.quantity,
                          address1:data.address1, address2:data.address2, state:data.state, areaCode: data.areaCode,city:data.city, phoneNo:data.phoneNo, 
                          paymentType:data.paymentType, cashAmount:data.cashAmount, paidPharmacy:data.paidPharmacy, paidIncuranceCompany:data.paidIncuranceCompany})
    
  }


  const onCreateOrder = () =>{
    if(data.paymentType===1){
      toggleModalVisibility()
    }
    else{
      console.log("data....", data);
      onNavigate()
      }
  }
  
  const onSubmit =() =>{
   
    console.log("data....", data);
    if(data.cashAmount.length!==0) {

        onNavigate()
      }
      
    else{
      ToastAndroid.showWithGravityAndOffset(
        'Please enter Cash Amount',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }  
  
   
   if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  
  else{

    return (
     <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>  
        {/* Dialog box */}
        <Modal  animationType="slide" 
                transparent visible={isModalVisible} 
                presentationStyle="overFullScreen" 
                onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                  <View style={[styles.modalView,{height: 280,}]}>
                    <Text style={{fontWeight:'bold', fontSize:18, paddingTop:10}}>
                    {'\u2022'} Cash to be collected</Text>

                    <Text style={{fontWeight:'bold', fontSize:15,paddingTop:10}}>
                    Paid by Pharmacy</Text>
                    <TextInput placeholder="Amount" 
                        value={data} style={styles.textInputDialogBox} 
                        keyboardType= "number-pad"
                        onChangeText={(value) => paidPharmacyInputChange(value)} 
                    />

                    <Text style={{fontWeight:'bold', fontSize:15,paddingTop:10}}>
                    Paid by Insurance Companys</Text>                        
                    <TextInput placeholder="Amount" 
                        value={data} style={styles.textInputDialogBox}
                        keyboardType= "number-pad" 
                        onChangeText={(value) => paidIncuranceCompanyInputChange(value)} 
                    />
                    
                    <TouchableOpacity style={styles.closeButton} onPress={()=>toggleModalVisibility()}>    
                      <Icon name="close" color={'#fff'} size={28}/>
                    </TouchableOpacity>
                      
                    {/** This button is responsible to close the modal */}
                    <Button style={styles.submit} onPress={()=>onSubmit()}>
                      <Text style={{color: '#fff', fontSize:17}}>Create Order</Text>     
                    </Button>  
                  </View>
                </View>
            </Modal>
        <ScrollView>      
             <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</Text>

               <View style={styles.action}>               
                  <TextInput 
                      placeholder="Name"
                      placeholderTextColor = "#fff"
                      style={[styles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => nameInputChange(val)}    
                  />
                </View>  
                  
                
                <View style={styles.dropdownSection}>
                 
                  <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={data.clientEmail}
                    onValueChange={(itemValue, itemIndex) => clientlistInputchange(itemValue)}>
                    {clientList.map((item, key)=>
                    <Picker.Item label={item.full_name} value={item.id} key={item.id} />)}
                  </Picker>
                  
                  {/* <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View> */}
                </View>
                <View style={styles.action}>
                  <TextInput 
                      placeholder="Medicine Name"
                      placeholderTextColor = "#fff"
                      style={[styles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => medicineNameInputChange(val)}
                  />
                </View> 
                <View style={styles.action}>
                  <TextInput 
                      placeholder="Quantity"
                      placeholderTextColor = "#fff"
                      style={[styles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => quantityInputChange(val)}
                  />
                </View>

                <View style={styles.action}>
                  <TextInput 
                      placeholder="Street Address"
                      placeholderTextColor = "#fff"
                      style={[styles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => address1InputChange(val)}
                  />
                </View>

                 <View style={styles.action}>
                  <TextInput 
                      placeholder="Apt, Building Gate Code, etc"
                      placeholderTextColor = "#fff"
                      style={[styles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => address2InputChange(val)}
                  />
                </View>
                 <View style={styles.dropdownSection}>
                 
                <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={stateList}
                    onValueChange={(itemValue, itemIndex) => stateInputChange(itemValue)}>
                    {stateList.map((item, key)=>
                    <Picker.Item label={item.state_name} value={item.id} key={item.id} />)}
                  </Picker>
                  
                  {/* <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View> */}
                </View>
               <View style={styles.dropdownSection}>
                 
                  <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={cityList}
                    onValueChange={(itemValue, itemIndex) => cityInputChange(itemValue)}>
                    {cityList.map((item, key)=>
                    <Picker.Item label={item.city_name} value={item.id} key={item.id} />)}
                  </Picker>
                  
                  {/* <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View> */}
                </View>              

                 <View style={styles.dropdownSection}>
                 
                   <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={areaCodeList}
                    onValueChange={(itemValue, itemIndex) => areaCodeInputChange(itemValue)}>
                    {areaCodeList.map((item, key)=>
                    <Picker.Item label={item.areacode} value={item.id} key={item.id} />)}
                  </Picker>
               

                  {/* <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View> */}
                </View>
                <View style={styles.action}>
                  <TextInput 
                      placeholder="Primary Phone"
                      placeholderTextColor = "#fff"
                      style={[styles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={(val) => phoneNoInputChange(val)}
                  />
                </View>
                <View style={{alignItems:'center', justifyContent:'center', marginVertical:15}}>
                  <RadioForm
                    radio_props={radio_props}
                    intial={0}
                    onPress={(value) => {paymentTypeInputChange(value)}}
                    buttonSize={12}
                    buttonOuterSize={25}
                    buttonColor={'#fff'}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={true}
                    labelStyle={{fontSize: 17, color: '#fff', marginLeft:30}}
                    selectedButtonColor= {'#fff'}
                  />
                </View>
 
              <View style={{alignItems:'center',justifyContent:'center', marginBottom:80}}> 
                <Button style={styles.submit} onPress= {()=>onCreateOrder()} >
                  <Text style={{color: '#fff', fontSize:17}}>Create Order</Text>     
                </Button>   
            </View>
        </ScrollView>

      </SafeAreaView>      
   
    );
  }  
};

export default StandardOrder;
