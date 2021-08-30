import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CalenderIcon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Card from '../../components/card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import {getTimeSlot, createPickUp} from '../../services/orders';
import {getuser} from '../../constants/tokenHandler';
import Toaster from 'services/toasterService';

const SelectTimeSlot = ({navigation, route}) => {
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState({
    pickupDate: '',
    timeSlot: '',
    deliveryInstructions: '',
  });

  const [list, setList] = React.useState([]);

  useEffect(() => {
    getTimeSlot().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setList(res.list);
        }
        setLoading(false);
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  }, []);

  const deliveryInstructionsInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        deliveryInstructions: val,
        check_deliveryInstructionsInputChange: true,
      });
    } else {
      setData({
        ...data,
        deliveryInstructions: val,
        check_deliveryInstructionsInputChange: false,
      });
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    data.pickupDate = `${tempDate[0]}, ${tempDate[2]}-${tempDate[1]}-${tempDate[3]}`;
    return date !== '' ? data.pickupDate : 'Select date';
  };

  function onCreatePickup() {
    createPickUp(
      route.params.orderType,
      route.params.name,
      route.params.clientEmail,
      route.params.medicineName,
      route.params.quantity,
      route.params.address1,
      route.params.address2,
      route.params.state,
      route.params.city,
      route.params.areaCode,
      route.params.phoneNo,
      route.params.paymentType,
      route.params.cashAmount,
      route.params.paidPharmacy,
      route.params.paidIncuranceCompany,
      data.pickupDate,
      data.timeSlot,
      data.deliveryInstructions,
    ).then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          alert(res.message);
          navigation.navigate('OrderDetails', {id: res.order_id});
        }
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  }

  const Item = ({id, fromName, toName}) => (
    <TouchableOpacity
      onPress={() => {
        setData({timeSlot: id});
      }}>
      <Card
        style={{
          backgroundColor: data.timeSlot === id ? 'grey' : '#292929',
          marginVertical: 10,
          paddingVertical: 13,
          paddingHorizontal: 16,
          alignSelf: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="clock-time-eight-outline" color={'#f0f0f0'} size={20} />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                color: data.timeSlot === id ? '#fff' : 'grey',
                fontSize: 17,
              }}>
              {fromName} to {toName}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item id={item.id} fromName={item.from_name} toName={item.to_name} />
  );

  if (isLoading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => showDatePicker()}>
          <View style={styles.showdate}>
            <Text style={{flex: 1, color: '#fff'}}>{getDate()}</Text>
            <CalenderIcon name="calendar-alt" color="#fff" size={25} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={<View style={{height: 30}}></View>}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Add delivery instructions..."
            placeholderTextColor="#fff"
            style={[styles.textInput, {fontSize: 16}]}
            autoCapitalize="none"
            onChangeText={val => deliveryInstructionsInputChange(val)}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <Button onPress={() => onCreatePickup()}>
            <Text style={{color: '#fff', fontSize: 17}}>Create Pickup</Text>
          </Button>
        </View>
      </View>
    );
  }
};

export default SelectTimeSlot;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    fontSize: 16,
    paddingLeft: 10,
    color: '#fff',
  },
  showdate: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingTop: 20,
    margin: 10,
  },

  action: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
});
