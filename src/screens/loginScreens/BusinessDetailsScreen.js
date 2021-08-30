import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../constants/colors';
import Card from '../../components/card';
import Button from '../../components/button';
import {signup, getStateList} from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../components/context';
import images from '../../images';
import loginStyles from './loginComponentsStyles';
import {setuser} from '../../constants/tokenHandler';
import Toaster from '../../services/toasterService';
import ModalPicker from 'react-native-modal-picker';

const BusinessDetailsScreen = ({route, navigation}) => {
  const [data, setData] = React.useState({
    businessName: '',
    registrationNo: '',
    businessType: '',
    ownerName: '',
    designation: '',
    address1: '',
    address2: '',
    state: '',
    areaCode: '',
    city: '',
    businessContactNo: '',
    businessDomain: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    instagram: '',
  });
  const [isLoading, setLoading] = useState(true);
  const [businessTypeList, setBusinessTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [businessDomainList, setBusinessDomainList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaCodeList, setAreaCodeList] = useState([]);

  useEffect(() => {
    getStateList().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setBusinessTypeList(res.business_type_list);
          setDesignationList(res.designation_list);
          setStateList(res.state_list);
          setCityList(res.city_list);
          setAreaCodeList(res.area_code_list);
          setBusinessDomainList(res.business_category_list);
          setLoading(false);
        }
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  }, []);

  const {signUp} = React.useContext(AuthContext);

  function onSignup() {
    if (data.businessName.length != 0) {
      if (data.registrationNo.length != 0) {
        if (validate(data.businessType)) {
          if (data.ownerName.length != 0) {
            if (validate(data.designation)) {
              if (data.address1.length != 0) {
                if (validate(data.state)) {
                  if (validate(data.city)) {
                    if (validate(data.areaCode)) {
                      if (data.businessContactNo.length == 10) {
                        if (validate(data.businessDomain)) {
                          console.log('data...', data);

                          signup(
                            route.params.fullName,
                            route.params.contactNo,
                            route.params.emailId,
                            route.params.passwordCheck,
                            data.businessName,
                            data.registrationNo,
                            data.businessType,
                            data.ownerName,
                            data.designation,
                            data.businessDomain,
                            data.address1,
                            data.address2,
                            data.state,
                            data.city,
                            data.areaCode,
                            data.businessContactNo,
                            data.facebook,
                            data.linkedin,
                            data.twitter,
                            data.instagram,
                          ).then(res => {
                            console.log(res);
                            console.log('in main tab');

                            if (res.code == 200) {
                              if (res.success == 'false') {
                                alert(res.message);
                                navigation.navigate('SignUpScreen');
                              } else {
                                const foundUser = async () => {
                                  try {
                                    await AsyncStorage.setItem(
                                      'userToken',
                                      res['merchant_details'][
                                        'access_token_db'
                                      ],
                                    );
                                  } catch (error) {
                                    console.log('setData error', e);
                                  }
                                };
                                foundUser();
                                setuser(
                                  res['merchant_details']['access_token_db'],
                                );
                                signUp(
                                  res['merchant_details']['access_token_db'],
                                );
                              }
                            } else {
                              Toaster.show(res.message, 3000);
                            }
                          });
                        } else {
                          Toaster.show('Please enter Business Domain', 3000);
                        }
                      } else {
                        Toaster.show(
                          'Please enter Correct Contact Number',
                          3000,
                        );
                      }
                    } else {
                      Toaster.show('Please enter Area Code', 3000);
                    }
                  } else {
                    Toaster.show('Please enter City', 3000);
                  }
                } else {
                  Toaster.show('Please enter State', 3000);
                }
              } else {
                Toaster.show('Please enter Address', 3000);
              }
            } else {
              Toaster.show('Please enter Designation', 3000);
            }
          } else {
            Toaster.show('Please enter Owner Name', 3000);
          }
        } else {
          Toaster.show('Please enter Business Type', 3000);
        }
      } else {
        Toaster.show('Please enter Business Registration Number', 3000);
      }
    } else {
      Toaster.show('Please enter Business Name', 3000);
    }
  }

  const validate = text => {
    if (text != 0) {
      return true;
    } else {
      return false;
    }
  };

  const businessNameInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        businessName: val,
        check_businessNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        businessName: val,
        check_businessNameInputChange: false,
      });
    }
  };

  const registrationNoInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        registrationNo: val,
        check_registrationNoInputChange: true,
      });
    } else {
      setData({
        ...data,
        registrationNo: val,
        registrationNoInputChange: false,
      });
    }
  };

  const businessTypeInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        businessType: val,
        check_businessTypeInputChange: true,
      });
    } else {
      setData({
        ...data,
        businessType: val,
        check_businessTypeInputChange: false,
      });
    }
  };

  const businessDomainInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        businessDomain: val,
        check_businessDomainInputChange: true,
      });
    } else {
      setData({
        ...data,
        businessDomain: val,
        check_businessDomainInputChange: false,
      });
    }
  };
  const ownerNameInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        ownerName: val,
        check_ownerNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        ownerName: val,
        check_ownerNameInputChange: false,
      });
    }
  };
  const designationInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        designation: val,
        check_designationInputChange: true,
      });
    } else {
      setData({
        ...data,
        designation: val,
        check_designationInputChange: false,
      });
    }
  };
  const address1InputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        address1: val,
        check_address1InputChange: true,
      });
    } else {
      setData({
        ...data,
        address1: val,
        check_address1InputChange: false,
      });
    }
  };
  const address2InputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        address2: val,
        check_address2InputChange: true,
      });
    } else {
      setData({
        ...data,
        address2: val,
        check_address2InputChange: false,
      });
    }
  };
  const stateInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        state: val,
        check_stateInputChange: true,
      });
    } else {
      setData({
        ...data,
        state: val,
        check_stateInputChange: false,
      });
    }
  };
  const areaCodeInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        areaCode: val,
        check_areaCodeInputChange: true,
      });
    } else {
      setData({
        ...data,
        areaCode: val,
        check_areaCodeInputChange: false,
      });
    }
  };
  const cityInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        city: val,
        check_cityInputChange: true,
      });
    } else {
      setData({
        ...data,
        city: val,
        check_cityInputChange: false,
      });
    }
  };
  const businessContactNoInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        businessContactNo: val,
        check_businessContactNoInputChange: true,
      });
    } else {
      setData({
        ...data,
        businessContactNo: val,
        check_businessContactNoInputChange: false,
      });
    }
  };
  const facebookInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        facebook: val,
        check_facebookInputChange: true,
      });
    } else {
      setData({
        ...data,
        facebook: val,
        check_facebookInputChange: false,
      });
    }
  };
  const linkedinInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        linkedin: val,
        check_linkedinInputChange: true,
      });
    } else {
      setData({
        ...data,
        linkedin: val,
        check_linkedinInputChange: false,
      });
    }
  };

  const twitterInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        twitter: val,
        check_twitterInputChange: true,
      });
    } else {
      setData({
        ...data,
        twitter: val,
        check_twitterInputChange: false,
      });
    }
  };
  const instagramInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        instagram: val,
        check_instagramInputChange: true,
      });
    } else {
      setData({
        ...data,
        instagram: val,
        check_instagramInputChange: false,
      });
    }
  };

  if (isLoading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={loginStyles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ScrollView>
          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Text style={styles.text_header}>Business Details</Text>
            <View style={loginStyles.action}>
              <TextInput
                placeholder="Business Name"
                placeholderTextColor="#fff"
                style={[loginStyles.textInput, {fontSize: 16}]}
                autoCapitalize="none"
                onChangeText={val => businessNameInputChange(val)}
              />
            </View>

            <View style={loginStyles.action}>
              <TextInput
                placeholder="Registration Number"
                placeholderTextColor="#fff"
                style={[loginStyles.textInput, {fontSize: 16}]}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={val => registrationNoInputChange(val)}
              />
            </View>
            <View style={styles.dropdownSection}>
              {/* <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={businessTypeList}
                onValueChange={(itemValue, itemIndex) =>
                  businessTypeInputChange(itemValue)
                }>
                {businessTypeList.map((item, key) => (
                  <Picker.Item
                    label={item.bussiness_type_name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker> */}
              <ModalPicker
                data={businessTypeList}
                initValue="Select something yummy!"
                onChange={option => {
                  console.log(option);
                  businessTypeInputChange(option);
                }}
                style={styles.picker}
                optionStyle={styles.pickerItem}
              />
            </View>
            <View style={loginStyles.action}>
              <TextInput
                placeholder="Owner Name"
                placeholderTextColor="#fff"
                style={[loginStyles.textInput, {fontSize: 16}]}
                autoCapitalize="none"
                onChangeText={val => ownerNameInputChange(val)}
              />
            </View>
            <View style={styles.dropdownSection}>
              {/* <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={designationList}
                onValueChange={(itemValue, itemIndex) =>
                  designationInputChange(itemValue)
                }>
                {designationList.map((item, key) => (
                  <Picker.Item
                    label={item.designation_name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker> */}

              <ModalPicker
                data={designationList}
                initValue="Select something yummy!"
                onChange={option => {
                  console.log(option);
                  designationInputChange(option);
                }}
                style={styles.picker}
                optionStyle={styles.pickerItem}
              />
            </View>

            <View style={styles.dropdownSection}>
              {/* <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={businessDomainList}
                onValueChange={(itemValue, itemIndex) =>
                  businessDomainInputChange(itemValue)
                }>
                {businessDomainList.map((item, key) => (
                  <Picker.Item
                    label={item.category_name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker> */}
              <ModalPicker
                data={businessDomainList}
                initValue="Select something yummy!"
                onChange={option => {
                  console.log(option);
                  businessDomainInputChange(option);
                }}
                style={styles.picker}
                optionStyle={styles.pickerItem}
              />
            </View>

            <Text style={styles.text_header}>Address</Text>
            <View style={loginStyles.action}>
              <TextInput
                placeholder="Street Address"
                placeholderTextColor="#fff"
                style={[loginStyles.textInput, {fontSize: 16}]}
                autoCapitalize="none"
                onChangeText={val => address1InputChange(val)}
              />
            </View>
            <View style={loginStyles.action}>
              <TextInput
                placeholder="Apt, Building Gate Code, etc"
                placeholderTextColor="#fff"
                style={[loginStyles.textInput, {fontSize: 16}]}
                autoCapitalize="none"
                onChangeText={val => address2InputChange(val)}
              />
            </View>
            <View style={styles.dropdownSection}>
              {/* <Picker
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
                  </View>               */}
{/* 
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={stateList}
                onValueChange={(itemValue, itemIndex) =>
                  stateInputChange(itemValue)
                }>
                {stateList.map((item, key) => (
                  <Picker.Item
                    label={item.state_name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker> */}
              <ModalPicker
                data={stateList}
                initValue="Select something yummy!"
                onChange={option => {
                  console.log(option);
                  stateInputChange(option);
                }}
                style={styles.picker}
                optionStyle={styles.pickerItem}
              />
            </View>

            <View style={styles.dropdownSection}>
              {/* <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={cityList}
                onValueChange={(itemValue, itemIndex) =>
                  cityInputChange(itemValue)
                }>
                {cityList.map((item, key) => (
                  <Picker.Item
                    label={item.city_name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker> */}
              <ModalPicker
                data={cityList}
                initValue="Select something yummy!"
                onChange={option => {
                  console.log(option);
                  cityInputChange(option);
                }}
                style={styles.picker}
                optionStyle={styles.pickerItem}
              />
            </View>
            <View style={styles.dropdownSection}>
              {/* <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={areaCodeList}
                onValueChange={(itemValue, itemIndex) =>
                  areaCodeInputChange(itemValue)
                }>
                {areaCodeList.map((item, key) => (
                  <Picker.Item
                    label={item.areacode}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker> */}
              <ModalPicker
                data={areaCodeList}
                initValue="Select something yummy!"
                onChange={option => {
                  console.log(option);
                  areaCodeInputChange(option);
                }}
                style={styles.picker}
                optionStyle={styles.pickerItem}
              />
            </View>

            <View style={loginStyles.action}>
              <TextInput
                placeholder="Contact Number"
                placeholderTextColor="#fff"
                style={[loginStyles.textInput, {fontSize: 16}]}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={val => businessContactNoInputChange(val)}
              />
            </View>
            <Text style={styles.text_header}>Link Social Accounts</Text>

            <View style={styles.inputSection}>
              <TextInput
                style={{flex: 1, color: '#fff'}}
                placeholder="Enter Facebook Account"
                placeholderTextColor="grey"
                onChangeText={val => facebookInputChange(val)}
              />
              <Image source={images.facebook} style={styles.icon} />
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={{flex: 1, color: '#fff'}}
                placeholder="Enter Linkedin Account"
                placeholderTextColor="grey"
                onChangeText={val => linkedinInputChange(val)}
              />
              <Image source={images.linkedIn} style={styles.icon} />
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={{flex: 1, color: '#fff'}}
                placeholder="Enter Twitter Account"
                placeholderTextColor="grey"
                onChangeText={val => twitterInputChange(val)}
              />
              <Image source={images.twitter} style={styles.icon} />
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={{flex: 1, color: '#fff'}}
                placeholder="Enter Instagram Account"
                placeholderTextColor="grey"
                onChangeText={val => instagramInputChange(val)}
              />
              <Image source={images.instagram} style={styles.icon} />
            </View>

            <View style={{alignItems: 'center'}}>
              <Button
                style={[loginStyles.submit, {marginTop: 30}]}
                onPress={() => onSignup()}>
                <Text style={{color: '#fff', fontSize: 17}}>Sign Up</Text>
              </Button>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}>
                <View style={styles.textPrivate}>
                  <Text style={[styles.textPrivate, {color: '#fff'}]}>
                    Already have a account?{' '}
                  </Text>
                  <Text
                    style={[
                      styles.textPrivate,
                      {fontSize: 15},
                      {color: '#fff'},
                    ]}>
                    Log In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
    marginTop: 8,
    marginBottom: -4,
    paddingLeft: 15,
  },
  picker: {
    color: '#fff',
    borderBottomWidth: 2,
    flex: 0.8,
    width: '100%',
  },
  pickerItem: {
    width: '100%',
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
  dropdownSection: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnSection: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  sectionText: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 16,
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
    marginVertical: 15,
    width: '100%',
  },
  cardSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  imageCategory: {
    padding: 5,
    marginLeft: 25,
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
  },
  inputSection: {
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
  icon: {
    margin: 5,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
