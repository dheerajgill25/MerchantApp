import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {pickup} from '../../services/history';
<<<<<<< HEAD
import Card from '../../components/card';
=======
import styles from './OrderHistoryStyles';
import Card from '../../components/card'
import Toaster from '../../services/toasterService';
>>>>>>> 29c9133e6975b023567a168bc145d27491bd5b08

const OrderPickup = () => {
  const [upcomingList, setUpcomingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => OrderListing(), 15000);

      console.log('Screen was focused');
      // Do something when the screen is focused
      return () => {
        clearInterval(intervalId);
        console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  useEffect(() => {
    OrderListing();
  }, []);

  function OrderListing() {
    pickup().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setUpcomingList(res.upcoming_pickup_list);
          setCompletedList(res.completed_pickup_list);
          setValue(res)
          };   
          setLoading(false);   
      }
      else {
          Toaster.show( res.message, 3000);
          console.log("error",res)
      }
    });
  }

  const Item = ({orderId, categoryImage, pickupTime, dropTime}) => (
    <Card
      style={{
        height: 160,
        backgroundColor: '#333',
        marginVertical: 10,
        flexDirection: 'row',
      }}>
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: 'grey'}}>ORDER ID</Text>
        <Text style={{color: '#fff', marginTop: 5}}>{orderId}</Text>
        <View style={{marginTop: 20}}>
          <Text style={{color: 'grey'}}>Delivery</Text>
          <Text style={{color: '#fff', marginTop: 5}}>
            Today, Between {pickupTime} - {dropTime}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Image
          source={{uri: categoryImage}}
          style={{height: 70, width: 70, borderRadius: 10}}
        />
      </View>
    </Card>
  );

  const renderItem = ({item}) => (
    <Item
      orderId={item.orderID}
      pickupTime={item.from_name}
      dropTime={item.to_name}
      categoryImage={item.category_icon}
    />
  );

  const CompleteItem = ({orderId, categoryImage, pickupTime, dropTime}) => (
    <Card
      style={{
        height: 160,
        backgroundColor: '#000',
        marginVertical: 10,
        flexDirection: 'row',
      }}>
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: 'grey'}}>ORDER ID</Text>
        <Text style={{color: '#fff', marginTop: 5}}>{orderId}</Text>
        <View style={{marginTop: 20}}>
          <Text style={{color: 'grey'}}>Delivery</Text>
          <Text style={{color: '#fff', marginTop: 5}}>
            Today, Between {pickupTime} - {dropTime}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Image
          source={{uri: categoryImage}}
          style={{height: 70, width: 70, borderRadius: 10}}
        />
      </View>
    </Card>
  );

  const completeRenderItem = ({item}) => (
    <CompleteItem
      orderId={item.orderID}
      pickupTime={item.from_name}
      dropTime={item.to_name}
      categoryImage={item.category_icon}
    />
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{marginTop: 60, flex: 4, marginHorizontal: 17}}>
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              color: '#fff',
              fontSize: 16,
            }}>
            Upcoming
          </Text>
          {value.no_record_upcoming_pickup_list == '0' ? (
            <FlatList
              data={upcomingList}
              renderItem={renderItem}
              keyExtractor={item => item.orderId}
            />
          ) : (
            <View
              style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>No Records</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
          <View>
            <Text
              style={{
                width: 90,
                textAlign: 'center',
                color: '#fff',
                fontSize: 16,
              }}>
              Completed
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
        </View>
        {value.no_record_completed_pickup_list == '0' ? (
          <View style={{flex: 3, marginHorizontal: 17}}>
            <FlatList
              data={completedList}
              renderItem={completeRenderItem}
              keyExtractor={item => item.orderId}
              ListFooterComponent={<View style={{height: 70}}></View>}
            />
          </View>
        ) : (
          <View
            style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff'}}>No Records</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
};
export default OrderPickup;
