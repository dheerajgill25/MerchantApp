import React,{useState,useEffect} from 'react';
import { View, 
StyleSheet,
SafeAreaView,
Text,
Image,
ScrollView,
TouchableOpacity, 
StatusBar,
TextInput,
ActivityIndicator} from 'react-native';
import profileStyles from '../../screens/profileStack/profileStyle';
import {reOrder} from '../../services/wallet';

const ReOrderScreen = ({route,navigation}) => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
     viewOrder()
    }, [])

    function viewOrder() {
       reOrder(route.params.id)
          .then((res) => {            
              if (res.code == 200){
                  if (res.success == "false"){
                      alert(res.message)
                  } 
                  else {
                    setData(res.re_order_info)
                    
                    }
                    setLoading(false)
                }
              else {
                alert(res.message)
              }                               
        });
    }

    const onOrderCreate =()=>{
      navigation.navigate('SelectTimeSlot',{orderType:data.order_type, name:data.client_name,clientEmail:data.client_id,medicineName:data.medicine_name,quantity:data.qty,
                      address1:data.street_addr, address2:data.building_addr, state:data.state, areaCode: data.area_code,city:data.city, phoneNo:data.primary_phone, 
                      paymentType:data.cash_collection_type, cashAmount:data.cash_amount, paidPharmacy:data.cash_pharmacy_amount, paidIncuranceCompany:data.cash_company_amount})
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
      <SafeAreaView style={profileStyles.container}>
      <StatusBar backgroundColor='#000' barStyle="light-content"/>  
      <ScrollView style={{marginBottom:70}}>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Name</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.client_name}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Client Email</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.client_email}</Text>
          </View>
        </View>
         <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Medicine Name</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.medicine_name}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Quantity</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.qty}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Address</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.street_addr}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Apt, Building, Gate code etc,</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.building_addr}</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>State</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.state_name}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row',paddingHorizontal: 20,justifyContent: 'space-between',}}>  
            <View style={[profileStyles.columnSection,]}>
              <Text style={profileStyles.text_footer}>City</Text>
            <View style={profileStyles.action}>
              <Text style= {profileStyles.showtext}>{data.city_name}</Text>
            </View>
          </View>  
          <View style={[profileStyles.columnSection,]}>
              <Text style={profileStyles.text_footer}>Area Code</Text>
            <View style={profileStyles.action}>
              <Text style= {profileStyles.showtext}>{data.areacode_name}</Text>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Contact no.</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.primary_phone}</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Payment type</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.cash_collection_type=='1'?'Cash to be collected':'Prepaid'}</Text>
          </View>
        </View>
        {
            data.order_type=='1'?
            <View style={{paddingHorizontal: 20,}}>
            <Text style={profileStyles.text_footer}>Cash to be collected amount</Text>
            <View style={profileStyles.action}>
                <Text style= {profileStyles.showtext}>{data.cash_amount}</Text>
            </View>
            </View>
            :
            <>
            <View style={{paddingHorizontal: 20,}}>
            <Text style={profileStyles.text_footer}>Paid by pharmacy</Text>
            <View style={profileStyles.action}>
                <Text style= {profileStyles.showtext}>{data.cash_pharmacy_amount}</Text>
            </View>
            </View>

            <View style={{paddingHorizontal: 20,}}>
            <Text style={profileStyles.text_footer}>Paid by insurance company</Text>
            <View style={profileStyles.action}>
                <Text style= {profileStyles.showtext}>{data.cash_company_amount}</Text>
            </View>
            </View>
        </>    
        }
         <View style={{margin:20,alignItems:'center',flex:1}}> 
        <TouchableOpacity style={profileStyles.greyButton}
             onPress={() => {onOrderCreate()}}>
            <Text style={{color: '#fff', fontSize:17}}>Create Order</Text>
        </TouchableOpacity>

      </View>
        </ScrollView>
      </SafeAreaView>
    );  
  }  
};

export default ReOrderScreen;

