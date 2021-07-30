import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,SafeAreaView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import profileStyles from './profileStyle';
import {newEnquiry} from '../../services/updateProfile';

const NewEnquiry =({navigation})=>{

    const [data, setData]=useState({
        orderId:"",
        contactNo:"",
        enquiry:"",
    })
    
    const orderIdInputChange = (val) => {
            setData({
                ...data,
                orderId: val,
            });
    }

    const contactNoInputChange = (val) => {
            setData({
                ...data,
                contactNo: val,
            });
    }

    const enquiryInputChange = (val) => {
            setData({
                ...data,
                enquiry: val,
            });
    }

    const onSubmit=()=>{

        if(data.contactNo.length == 10){
            newEnquiry(data.orderId, data.contactNo,data.enquiry)

            .then((res) => {
      
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                } 
                else {
                    alert(res.message)
                    navigation.navigate('HelpCenterList')
                }
            }

            else {
                ToastAndroid.showWithGravityAndOffset(
                res.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50);
            }
                                      
        })
        }
        else{
                ToastAndroid.showWithGravityAndOffset(
                'Please enter correct contact number',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            ); 
        }
        
    }

    return(
        <SafeAreaView style={{backgroundColor: 'black', flex:1}}>
            <ScrollView style={{marginBottom:70,paddingHorizontal:20}}>
                
                <Text style={profileStyles.text_footer}>Order Id</Text>
                <View style={profileStyles.action}>
                    <TextInput 
                    placeholderTextColor = "#fff"
                    style={profileStyles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => orderIdInputChange(val)}
                    />
                </View>
                
                
                    <Text style={profileStyles.text_footer}>Contact no.</Text>
                    <View style={profileStyles.action}>
                        <TextInput 
                        placeholderTextColor = "#fff"
                        style={profileStyles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => contactNoInputChange(val)}
                        />
                    </View>
                
                
                    <Text style={profileStyles.text_footer}>Enquiry Details</Text>
                    <View style={{marginTop:25}}>
                        <TextInput 
                            placeholder="Enter Enquiry here "
                            multiline={true}
                            numberOfLines={8}
                            style={[profileStyles.textInput,{backgroundColor: 'grey',}]}
                            onChangeText={(val) => enquiryInputChange(val)}
                        />
                    </View>
            
            <View style={{alignItems:'center',justifyContent:'center', marginVertical:30}}> 
                <Button onPress={()=>onSubmit()}>
                    <Text style={{color: '#fff', fontSize:17}}>Submit</Text>     
                </Button>   
            </View>
            
            </ScrollView> 
        </SafeAreaView>
    );
};

export default NewEnquiry;