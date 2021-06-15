import React, { useState } from 'react';

import { View, 
  Text, 
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/colors';
import Card from '../../components/card';
import Button from '../../components/button';
import { signup } from "../../services/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../components/context';
import images from '../../images';
import loginStyles from './loginComponentsStyles';


const BusinessDetailsScreen = ({route, navigation}) => {

  const [data, setData] = React.useState({
    businessName: '',
    registrationNo:'',
    businessType: '',
    ownerName: '',
    designation: '',
    address1:'',
    address2:'',
    state:'',
    areaCode:'',
    city:'',
    businessContactNo:'',
    facebook:'',
    linkedin:'',
    twitter:'',
    instagram:'',
    category: ''
  });

    const { signUp } = React.useContext(AuthContext);
    
      function onSignup() {
          if (data.businessName.length != 0) {
              if (data.registrationNo.length !=0) {
                if (validate(data.businessType)) { 
                  if (data.ownerName.length != 0) {
                    if(validate(data.designation)){
                      if (data.address1.length !=0) {
                          if (validate(data.state)) {
                            if (data.areaCode.length ==6) {
                              if(data.city.length != 0){
                                if (data.businessContactNo.length == 10) {

                                  signup(route.params.fullName, route.params.contactNo, route.params.emailId, route.params.passwordCheck, data.businessName, data.registrationNo, data.businessType, data.ownerName,
                                        data.designation, data.address1, data.address2, data.state,data.areaCode, data.city, data.businessContactNo, data.facebook, data.linkedin,
                                        data.twitter, data.instagram, data.category )

                                    .then((res) => {
                                      console.log(res);
                                      console.log('in main tab');
                                      
                                       if (res.code == 200){
                                       if (res.success == "false"){
                                          alert(res.message)
                                          navigation.navigate('SignUpScreen')
                                         } 
                                        else {
                                           const foundUser = async () => {      
                                              try {
                                                  await AsyncStorage.setItem(
                                                  'userToken',
                                                  res["merchant_details"]["access_token_db"]
                                                  );
                                              } catch (error) {
                                                  console.log("setData error", e)
                                              }
                                              
                                              };
                                              foundUser();
                                              signUp(res["merchant_details"]["access_token_db"])
                                              
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
                                
                                 else {
                                  ToastAndroid.showWithGravityAndOffset(
                                    'Please enter Correct Contact',
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50
                                  ); 
                                }

                              }
                              else{
                                ToastAndroid.showWithGravityAndOffset(
                                  'Please enter City',
                                  ToastAndroid.LONG,
                                  ToastAndroid.BOTTOM,
                                  25,
                                  50
                                ); 
                              }
                              
                            } else {
                                ToastAndroid.showWithGravityAndOffset(
                                'Please enter Area Code',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                              ); 
                            }

                            
                          } else {
                            ToastAndroid.showWithGravityAndOffset(
                              'Please enter State',
                              ToastAndroid.LONG,
                              ToastAndroid.BOTTOM,
                              25,
                              50
                            ); 
                          }
                        
                      } else {
                        ToastAndroid.showWithGravityAndOffset(
                        'Please enter Address',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      ); 
                      }

                    }
                    else{
                        ToastAndroid.showWithGravityAndOffset(
                        'Please enter Designation',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      ); 
                    }
                    
                  }
                   else {
                    ToastAndroid.showWithGravityAndOffset(
                    'Please enter Owner Name',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  ); 
                     
                  }
                  
                } 
              else {
                ToastAndroid.showWithGravityAndOffset(
                'Please enter Business Type',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ); 
                }
                
              } 
              else {
                ToastAndroid.showWithGravityAndOffset(
                'Please enter Business Registration Number',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ); 
              }
            
          } 
          else {
            ToastAndroid.showWithGravityAndOffset(
              'Please enter Business Name',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
          ); 
            
          }

       }

      function onChooseCategory(categoryValue){
        setData({
          ...data,
          category: categoryValue
        });
      }
      
      const validate = (text) => {

          if (text.length= 1) {
              return true;
          }
          else { 
              return false;
          }
      }
        
       const businessNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                businessName: val,
                check_businessNameInputChange: true
            });
        } else {
            setData({
                ...data,
                businessName: val,
                check_businessNameInputChange: false
            });
        }
    }

      const registrationNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                registrationNo: val,
                check_registrationNoInputChange: true
            });
        } else {
            setData({
                ...data,
                registrationNo: val,
                registrationNoInputChange: false
            });
        }
    }
      
      const businessTypeInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                businessType: val,
                check_businessTypeInputChange: true
                
            });
        } else {
            setData({
                ...data,
                businessType: val,
                check_businessTypeInputChange: false
            });
        }
    }
      const ownerNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                ownerName: val,
                check_ownerNameInputChange: true
            });
        } else {
            setData({
                ...data,
                ownerName: val,
                check_ownerNameInputChange: false
            });
        }
    }
      const designationInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                designation: val,
                check_designationInputChange: true
            });
        } else {
            setData({
                ...data,
                designation: val,
                check_designationInputChange: false
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
 const businessContactNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                businessContactNo: val,
                check_businessContactNoInputChange: true
            });
        } else {
            setData({
                ...data,
                businessContactNo: val,
                check_businessContactNoInputChange: false
            });
        }
    }
 const facebookInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                facebook: val,
                check_facebookInputChange: true
            });
        } else {
            setData({
                ...data,
                facebook: val,
                check_facebookInputChange: false
            });
        }
    }
     const linkedinInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                linkedin: val,
                check_linkedinInputChange: true
            });
        } else {
            setData({
                ...data,
                linkedin: val,
                check_linkedinInputChange: false
            });
        }
    }
 
 const twitterInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                twitter: val,
                check_twitterInputChange: true
            });
        } else {
            setData({
                ...data,
                twitter: val,
                check_twitterInputChange: false
            });
        }
    }
const instagramInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                instagram: val,
                check_instagramInputChange: true
            });
        } else {
            setData({
                ...data,
                instagram: val,
                check_instagramInputChange: false
            });
        }
    }

  const [pickerValue, setpickerValue] = useState("java");

    return (
      <SafeAreaView style={loginStyles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>  
        <ScrollView>      
              <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
              >
              <Text style={styles.text_header}>Business Details</Text>
                <View style={loginStyles.action}>
                                
                  <TextInput 
                      placeholder="Business Name"
                      placeholderTextColor = "#fff"
                      style={[loginStyles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => businessNameInputChange(val)}
                       
                  />
                </View>  
                  
                <View style={loginStyles.action}>
                  <TextInput 
                      placeholder="Registration Number"
                      placeholderTextColor = "#fff"
                      style={[loginStyles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={(val) => registrationNoInputChange(val)}
                  />
                </View> 
                <View style={styles.dropdownSection}>
                  <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={data}
                    label={"Types of Business"}
                    onValueChange={ (itemValue) => businessTypeInputChange(itemValue)}
                  > 
                  <Picker.Item label="Types of Business" value =""/>
                  <Picker.Item label="Flower" value ="Flower"/>
                  <Picker.Item label="Pharmacy" value ="Pharmacy"/>
                  <Picker.Item label="Documents" value ="Documents"/>
                  </Picker>
                  
                  <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View>
                </View>
                <View style={loginStyles.action}>
                  <TextInput 
                      placeholder="Owner Name"
                      placeholderTextColor = "#fff"
                      style={[loginStyles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => ownerNameInputChange(val)}
                  />
                </View> 
              <View style={styles.dropdownSection}>
                  <Picker
                    style={[styles.picker]}
                    selectedValue={data}
                    onValueChange={ (itemValue) => designationInputChange(itemValue) }
                  >   
                  <Picker.Item label="Designation" value =""/>
                  <Picker.Item label="Manager" value ="Manager"/>
                  <Picker.Item label="Developer" value ="Developer"/>
                  <Picker.Item label="Director" value ="Director"/>
                  </Picker>
                 <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View>
              </View>  
               <Text style={styles.text_header}>Address</Text>      
                <View style={loginStyles.action}>
                  <TextInput 
                      placeholder="Street Address"
                      placeholderTextColor = "#fff"
                      style={[loginStyles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => address1InputChange(val)}
                  />
                </View>
                 <View style={loginStyles.action}>
                  <TextInput 
                      placeholder="Apt, Building Gate Code, etc"
                      placeholderTextColor = "#fff"
                      style={[loginStyles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      onChangeText={(val) => address2InputChange(val)}
                  />
                </View>
              <View style={styles.dropdownSection}>
                  <Picker
                    style={styles.picker}
                    selectedValue={data}
                    onValueChange={(itemValue) => stateInputChange(itemValue)}
                  > 
                  <Picker.Item label="State" value =""/>
                  <Picker.Item label="Rajasthan" value ="Rajasthan"/>
                  <Picker.Item label="Maharastra" value ="Maharastra"/>
                  <Picker.Item label="Goa" value ="Goa"/>
                  </Picker>  
                   <View style={styles.arrowWrapper}>
                    <Text style={styles.arrow}>&#9660;</Text>
                  </View>              
              </View>

              <View style={{ flexDirection: 'row'}}>  
               <View style={[styles.columnSection,{marginRight:'5%'}]}>
                  <TextInput 
                      placeholder="Area Code"
                      placeholderTextColor = "#fff"
                      style={styles.sectionText}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={(val) => areaCodeInputChange(val)}
                  />
                </View>  
                <View style={[styles.columnSection,{marginLeft:'5%'}]}>
                  <TextInput 
                      placeholder="City"
                      placeholderTextColor = "#fff"
                      style={styles.sectionText}
                      autoCapitalize="none"
                      onChangeText={(val) => cityInputChange(val)}
                  />
                </View>
              </View>  
              <View style={loginStyles.action}>
                  <TextInput 
                      placeholder="Contact Number"
                      placeholderTextColor = "#fff"
                      style={[loginStyles.textInput,{fontSize:16,}]}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={(val) => businessContactNoInputChange(val)}
                  />
                </View>
              <Text style={styles.text_header}>Link Social Accounts</Text>


            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Facebook Account" 
              placeholderTextColor="grey"
              onChangeText={(val) => facebookInputChange(val)}
               />
              <Image 
              source={images.facebook}
              style={styles.icon}         
            />
            </View>
            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Linkedin Account" 
              placeholderTextColor="grey" 
              onChangeText={(val) => linkedinInputChange(val)}
              />
              <Image 
              source={images.linkedIn}
              style={styles.icon}         
            />
            </View>
            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Twitter Account" 
              placeholderTextColor="grey" 
              onChangeText={(val) => twitterInputChange(val)}/>
              <Image 
              source={images.twitter}
              style={styles.icon}         
            />
            </View>
            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Instagram Account" 
              placeholderTextColor="grey"
              onChangeText={(val) => instagramInputChange(val)} />
              <Image 
              source={images.instagram}
              style={styles.icon}         
            />
            </View>
              <Text style={styles.text_header}>Select Category</Text>
            <View>
              <TouchableOpacity onPress={() => onChooseCategory('Pharmacy')}>
              <Card style={styles.card}>
                <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
                  <View style={[styles.cardSection,{flex: 2,}]}>               
                    <Text style={{fontSize: 24,fontWeight: 'bold',color: Colors.white,}}>
                    Pharmacy</Text>
                    <Text style={{fontSize: 15,color: Colors.white,}}>
                    Lorem ipsum dolor sit amet</Text>
                  </View>  
                  <View style={[styles.cardSection,{flex:1}]}>
                      <Image 
                        source={images.pills}
                        style={styles.imageCategory}       
                      />
                  </View>
                </View>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onChooseCategory('Flowers')}>
                <Card style={styles.card}>
                <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
                  <View style={[styles.cardSection,{flex: 2,}]}>               
                    <Text style={{fontSize: 24,fontWeight: 'bold',color: Colors.white,}}>
                    Flowers</Text>
                    <Text style={{fontSize: 15,color: Colors.white,}}>
                    Lorem ipsum dolor sit amet</Text>
                  </View>  
                  <View style={[styles.cardSection,{flex:1}]}>
                      <Image 
                        source={images.flowers}
                        style={styles.imageCategory}       
                      />
                  </View>
                </View>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onChooseCategory('Documents')}>
              
                <Card style={styles.card}>
                <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
                  <View style={[styles.cardSection,{flex: 2}]}>               
                    <Text style={{fontSize: 24,fontWeight: 'bold',color: Colors.white,}}>
                    Documents</Text>
                    <Text style={{fontSize: 15,color: Colors.white,}}>
                    Lorem ipsum dolor sit amet</Text>
                  </View>  
                  <View style={[styles.cardSection,{flex:1}]}>
                      <Image 
                        source={images.checklist}
                        style={styles.imageCategory}       
                      />
                  </View>
                </View>
                </Card>
              </TouchableOpacity>
            </View>  
              <View style={{alignItems:'center'}}>
                {/* <TouchableOpacity
                    onPress={() => onSignup()}
                    style={[styles.signIn, {
                        borderColor: '#fff',
                        borderWidth: 1,                        
                    }]}
                >
                    <Text style={[styles.buttontext, {
                        color: '#fff'
                    }]}>Sign up</Text>
                </TouchableOpacity>    */}
                
                <Button style={[loginStyles.submit,{marginTop:30,}]} onPress={() => onSignup()}>
                  <Text style={{color: '#fff', fontSize:17}}>Sign Up</Text>     
                </Button>

              <TouchableOpacity 
                        onPress = {()=> navigation.navigate('SignInScreen')}>
                  <View style= {styles.textPrivate}>
                      <Text style = {[styles.textPrivate,{color: '#fff'}]}>Already have a account? </Text>
                      <Text style = {[styles.textPrivate, {fontSize: 15},{color: '#fff'}]}>Log In</Text> 
                  </View>  
              </TouchableOpacity>   
            </View>
            
          </Animatable.View>
        </ScrollView>

      </SafeAreaView>      
    );
};

export default BusinessDetailsScreen;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 20,
    },  
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
    paddingTop: 10,
    alignSelf: 'flex-start',
    marginTop : 8, 
    marginBottom: -4, 
    paddingLeft :15,
  },
  picker:{
    color:'#fff',
    borderBottomWidth: 2,
    flex: 0.8,
    width: '100%',
  },
  pickerItem: {
    width:'100%',
    color: '#fff',
  },
  arrowWrapper: {
    flex: 0.2,
    justifyContent: 'center',
  },
  arrow: {
    textAlign: 'center',
    color: '#fff',
  },
  dropdownSection:{
    borderBottomWidth:1,
    borderColor:'#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnSection:{
    flex:1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff', 
  },
  sectionText:{
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
    fontSize:16,
  },
  textPrivate: {
    flexDirection: 'row',
    marginTop: 7,
    color: '#fff',
  },
  card: {
    height: 90,
    backgroundColor: '#333',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical:15,
    width: '100%',
  }, 
  cardSection:{
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'column',  
  }, 
  imageCategory:{
    padding: 5,
    marginLeft: 25,
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
  },
  inputSection:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'blue',
    height: 45,
    borderRadius: 40,
    margin: 10,
    fontSize: 16,
    },
  icon:{
    margin: 5,
    width: 40,
    height: 40,
    borderRadius: 40/2,
    resizeMode:'stretch',
    alignItems: 'center',
  },
  
});
