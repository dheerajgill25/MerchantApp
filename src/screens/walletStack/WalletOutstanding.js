import React from 'react';
import { 
  View, 
  Text, 
  Button,
  StatusBar,
  TextInput, 
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions, 
} from 'react-native';

import Card from '../../components/card';


const WalletOutstanding = ({navigation}) => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>
          
        <View style={{ flexDirection: 'row',backgroundColor:'#333',justifyContent: 'space-between', alignItems: 'center',}}>  
          <View style={[styles.columnSection,]}>               
            <Text style= {{fontSize: 18, justifyContent: 'center', color:'grey', }}>
              Total Transactions</Text>
          </View>  

          <View style={[styles.columnSection,]}>
            <Text style= {{fontSize: 20, color: '#fff' ,textAlign: 'right', }}>
              $12,258.00</Text>
          </View>
        </View>

        <Card style={styles.card}>
          <View style={{ flexDirection: 'row',marginHorizontal:-8,marginVertical:-5,}}>      
            <View style={[styles.cardSection,{flex: 1,alignItems: 'flex-start',}]}>               
              <Text style={{fontSize: 17,color: 'grey',}}>
              Total Outstanding</Text>
            </View>  
            <View style={[styles.cardSection,{flex:1}]}>
              <Text style= {{fontSize: 21, color: '#fff' ,textAlign: 'right', }}>
                $12,258.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row',marginHorizontal:-8,marginVertical:15,}}>      
              <View style={[styles.cardSection,{flex: 1,alignItems: 'flex-start',}]}>               
                <Text style={{fontSize: 15,color: 'grey',}}>
                Next Payment Cycle</Text>
              </View>
          </View>
          <View style={{ flexDirection: 'row',marginHorizontal:-8,}}>      
              <View style={[styles.cardSection,{flex: 1,alignItems: 'flex-start',}]}>               
                <Text style={{fontSize: 18,color: 'grey',}}>
                05 Jan 2021</Text>
              </View>
          </View>

          <View style={{marginHorizontal:-8,marginVertical:10, flex:1,alignSelf: "center",flexDirection:'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('sample')}
            style={styles.submit}>
            <Text style={{color: '#fff', fontSize:17}}>Pay Now</Text>
          </TouchableOpacity> 
          </View>

        </Card>
        
      </View>
    );

};


export default WalletOutstanding;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000',
    width:'100%',
  
  },
  columnSection:{
    flexDirection: 'column',
    marginVertical:17,
    marginHorizontal:15,
  },
  card: {
    height: '68%',
    backgroundColor: '#333',
    alignItems: 'flex-start',
    margin:22,
  }, 
  cardSection:{
    justifyContent: 'flex-end',
    flexDirection: 'column',  
  },
  submit: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2, 
    },
});