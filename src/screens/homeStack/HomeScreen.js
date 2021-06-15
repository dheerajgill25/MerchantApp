import React from 'react';
import { View, Text, StyleSheet, StatusBar,Image,SafeAreaView,TouchableOpacity } from 'react-native';
import images from '../../images';
import Card from '../../components/card';
import Button from '../../components/button'
import Icon from 'react-native-vector-icons/Entypo';

const HomeScreen = ({navigation}) => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>
        <Image 
          source={images.deliveryTruck}
          style={{width:'100%'}}
          resizeMode="stretch"
        />
        <Card style={styles.card}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'column',flex:0.8}}>  
              <Text style={{color:'#fff', fontSize:15}}>Next Scheduled Pickup</Text>
              <Text style={{color:'grey', fontSize:14, marginVertical:5}}>Pharmacy</Text>
            </View>
      
            <View style={{flexDirection:'column',alignItems:'flex-end',flex:0.2}}>
              <Image 
                source={images.pills}
                style={{width:60, height:60, }}
                resizeMode="stretch"
              />
            </View>  
          </View>
      
              <Card style={styles.cardHighlight}>   
              <View style= {{flexDirection:'row'}}>
                <Icon name="back-in-time" color={'#f0f0f0'} size={20}/>
                <Text style={{color:'grey', fontSize:17}}>   8:00 AM to 12:00 PM</Text>
              </View>  
              </Card>
            <View style={{marginVertical:10}}>  
              <Card style={styles.cardHighlight}>     
                <Text style={{color:'grey', fontSize:13}}>Tomorrow, 20 February,2021</Text>
              </Card>
            </View>  
            <Button style={styles.redButton} onPress={() => onSignIn()}>
                <Text style={{color: '#fff', fontSize:16}}>Cancel Pickup</Text>     
            </Button> 
        </Card>
        <View style= {{flexDirection:'row', alignSelf:'center'}}>
          <Button style={styles.button} onPress={() => navigation.navigate('PriorityOrder')}>
                <Text style={{color: '#fff', fontSize:16}}>Priority Pickup</Text>     
          </Button> 
           <Button style={styles.button} onPress={() => navigation.navigate('StandardOrder')}>
                <Text style={{color: '#fff', fontSize:16}}>Regular Order</Text>     
          </Button>
        </View>
      </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
  },
  card: {
    height: '40%',
    backgroundColor: '#333333',
    marginVertical:20,
    marginHorizontal: 15,
  }, 
  cardHighlight:{
    backgroundColor: '#292929',
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignSelf:'center', 
    justifyContent:'center' 
  },
  redButton:{
    borderColor: 'red',
    backgroundColor:'red',
    width:'48%',
    alignSelf:'center', 
    justifyContent:'center',
    padding: 8,
    height:45,
  },
  button:{
    borderColor: '#fff',
    backgroundColor:'grey',
    width:'40%',
  }
});
