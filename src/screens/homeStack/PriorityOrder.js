import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import styles from './homeStyle';
import {getClientList} from '../../services/orders';
import {getStateList} from '../../services/auth';
import Toaster from '../../services/toasterService';
import DropdownComponent from '../../components/dropdown'
const PriorityOrder = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState({
    orderType: 1,
    name: '',
    clientEmail: '',
    medicineName: '',
    quantity: '',
    address1: '',
    address2: '',
    state: '',
    areaCode: '',
    city: '',
    phoneNo: '',
    paymentType: 1,
    cashAmount: '',
    paidPharmacy: 0,
    paidIncuranceCompany: 0,
  });

  const [clientList, setClientList] = React.useState([]);
  const [businessTypeList, setBusinessTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaCodeList, setAreaCodeList] = useState([]);

  useEffect(() => {
    StateList();
    
  }, []);



  function StateList() {
    getStateList().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setStateList(res.state_list);
          setCityList(res.city_list);
          setAreaCodeList(res.area_code_list);
          setLoading(false);
        }
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  }

  const validate = text => {
    if (text != 0) {
      return true;
    } else {
      return false;
    }
  };

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  var radio_props = [
    {label: 'Cash to be collected', value: 1},
    {label: 'Prepaid', value: 2},
  ];

  const amountInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        cashAmount: val,
        check_amountInputChange: true,
      });
    } else {
      setData({
        ...data,
        cashAmount: val,
        check_amountInputChange: false,
      });
    }
  };
  const nameInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        name: val,
        check_nameInputChange: true,
      });
    } else {
      setData({
        ...data,
        fullName: val,
        check_nameInputChange: false,
      });
    }
  };

  const medicineNameInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        medicineName: val,
        check_medicineNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        medicineName: val,
        check_medicineNameInputChange: false,
      });
    }
  };

  const quantityInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        quantity: val,
        check_quantityInputChange: true,
      });
    } else {
      setData({
        ...data,
        quantity: val,
        check_quantityInputChange: false,
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

  const phoneNoInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        phoneNo: val,
        check_phoneNoInputChange: true,
      });
    } else {
      setData({
        ...data,
        phoneNo: val,
        check_phoneNoInputChange: false,
      });
    }
  };
  const clientEmailInputchange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        clientEmail: val,
      });
    } else {
      setData({
        ...data,
        clientEmail: val,
      });
    }
  };
  const paymentTypeInputChange = val => {
    setData({
      ...data,
      paymentType: val,
      check_paymentTypeInputChange: true,
    });
  };

  function onNavigate() {
    navigation.navigate('SelectTimeSlot', {
      orderType: data.orderType,
      name: data.name,
      clientEmail: data.clientEmail,
      medicineName: data.medicineName,
      quantity: data.quantity,
      address1: data.address1,
      address2: data.address2,
      state: data.state,
      areaCode: data.areaCode,
      city: data.city,
      phoneNo: data.phoneNo,
      paymentType: data.paymentType,
      cashAmount: data.cashAmount,
      paidPharmacy: data.paidPharmacy,
      paidIncuranceCompany: data.paidIncuranceCompany,
    });
  }

  const onCreateOrder = () => {
    if (data.paymentType === 1) {
      toggleModalVisibility();
    } else {
      onNavigate();
    }
  };

  const onSubmit = () => {
    if (data.cashAmount.length !== 0) {
      onNavigate();
    } else {
      Toaster.show('Please enter Cash Amount', 3000);
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
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        {/* Dialog box */}
        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          presentationStyle="overFullScreen"
          onDismiss={toggleModalVisibility}>
          <View style={styles.viewWrapper}>
            <View style={[styles.modalView, {height: 200}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {'\u2022'} Cash to be collected
              </Text>
              <TextInput
                placeholder="Amount"
                keyboardType="number-pad"
                style={styles.textInputDialogBox}
                onChangeText={val => amountInputChange(val)}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => toggleModalVisibility()}>
                <Icon name="close" color={'#fff'} size={28} />
              </TouchableOpacity>

              {/** This button is responsible to close the modal */}
              <Button style={styles.submit} onPress={() => onSubmit()}>
                <Text style={{color: '#fff', fontSize: 17}}>Create Order</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#333',
              paddingVertical: 10,
              paddingHorizontal: 20,
              margin: 5,
              borderRadius: 100,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#fff', textAlign: 'left'}}>
              Same day priority delivery
            </Text>
            <Text style={{color: '#fff', textAlign: 'right'}}>Selected</Text>
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Client Name"
              placeholderTextColor="#fff"
              style={[styles.textInput, {fontSize: 16}]}
              autoCapitalize="none"
              onChangeText={val => nameInputChange(val)}
            />
          </View>

          
            <View
                style={styles.action}>
                 <TextInput
                  placeholder="Client Email"
                  placeholderTextColor="#fff"
                  style={[styles.textInput, {fontSize: 16}]}
                  autoCapitalize="none"
                  onChangeText={val => clientEmailInputchange(val)}
                />
            </View>
          
          <View style={styles.action}>
            <TextInput
              placeholder="Medicine Name"
              placeholderTextColor="#fff"
              style={[styles.textInput, {fontSize: 16}]}
              autoCapitalize="none"
              onChangeText={val => medicineNameInputChange(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Quantity"
              placeholderTextColor="#fff"
              style={[styles.textInput, {fontSize: 16}]}
              autoCapitalize="none"
              onChangeText={val => quantityInputChange(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Apt, Building Gate Code, etc"
              placeholderTextColor="#fff"
              style={[styles.textInput, {fontSize: 16}]}
              autoCapitalize="none"
              onChangeText={val => address2InputChange(val)}
            />
          </View>
          
          <View style={styles.action}>
            <TextInput
              placeholder="Street Address"
              placeholderTextColor="#fff"
              style={[styles.textInput, {fontSize: 16}]}
              autoCapitalize="none"
              onChangeText={val => address1InputChange(val)}
            />
          </View>

          
          <View>
            <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#fff', marginBottom: 20, 
                }}>
                <DropdownComponent
                  title={'Please select state'}
                  dropdownData={stateList}
                  onPress={data => stateInputChange(data.id)}
                  type="stateList"
                />
              </View>

          </View>
          <View>
            <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#fff', marginBottom: 20, 
                }}>
                <DropdownComponent
                  title={'Please select city'}
                  dropdownData={cityList}
                  onPress={data => cityInputChange(data.id)}
                  type="cityList"
                />
              </View>
        
          </View>

          <View>
           
            <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#fff', marginBottom: 20, 
                }}>
                <DropdownComponent
                  title={'Please select area code'}
                  dropdownData={areaCodeList}
                  onPress={data => areaCodeInputChange(data.id)}
                  type="areacode"
                />
              </View>
          
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Primary Phone"
              placeholderTextColor="#fff"
              style={[styles.textInput, {fontSize: 16}]}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={val => phoneNoInputChange(val)}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 15,
            }}>
            <RadioForm
              radio_props={radio_props}
              intial={0}
              onPress={value => {
                paymentTypeInputChange(value);
              }}
              buttonSize={12}
              buttonOuterSize={25}
              buttonColor={'#fff'}
              formHorizontal={false}
              labelHorizontal={true}
              animation={true}
              labelStyle={{fontSize: 17, color: '#fff', marginLeft: 30}}
              selectedButtonColor={'#fff'}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 80,
            }}>
            <Button style={styles.submit} onPress={() => onCreateOrder()}>
              <Text style={{color: '#fff', fontSize: 17}}>Create Order</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default PriorityOrder;