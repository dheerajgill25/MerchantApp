import React from 'react';
import { View, 
StyleSheet,
SafeAreaView,
Text,
Image,
ScrollView,
TouchableOpacity, 
StatusBar,
TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../images';
import profileStyles from './profileStyle';



const ProfileScreen = ({navigation}) => {
    return (
      <SafeAreaView style={profileStyles.container}>
      <StatusBar backgroundColor='#000' barStyle="light-content"/>  
        <ScrollView>
        <View style= {{alignItems: 'center', justifyContent: 'center',}}>
          <View style ={profileStyles.profileImage}>
          <Avatar.Image 
            source={images.logo}
            size={120}
          />
          </View>
        </View>  

         <TouchableOpacity style= {profileStyles.editProfile} onPress={() => navigation.navigate('editProfileScreen')}>
             <Icon name="edit" color={'#fff'} size={19}/>
         </TouchableOpacity>

        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Name</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>John Doe</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Contact no.</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>1234567890</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Email</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>sample@gmail.com</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Business Name</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>Loream Ipsum</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Registration no.</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>1234567890</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Business Type</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>Pvt Ltd.</Text>
          </View>
        </View><View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Business Domain</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>Florist</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Facebook (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>1234567890</Text>
            <Image source={images.facebook} style={profileStyles.icon}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Linkedin (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>1234567890</Text>
            <Image source={images.linkedIn} style={profileStyles.icon}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Twitter (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>1234567890</Text>
            <Image source={images.twitter} style={profileStyles.icon}/>  
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Instagram (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>1234567890</Text>
            <Image source={images.instagram} style={profileStyles.icon}/>
          </View>
        </View>
            
              <View style={{ flexDirection: 'row',justifyContent: 'space-between', flex:1,marginHorizontal: 20, }}>  
                <View style={[profileStyles.columnSection,{marginLeft:-10}]}>
                  <TouchableOpacity style={profileStyles.greyButton}
                      onPress={() => {}}>
                      <Text style={{color: '#fff', fontSize:15}}>Change Password</Text>
                  </TouchableOpacity>
                </View>  
                <View style={[profileStyles.columnSection,{marginRight:10}]}>
                  <TouchableOpacity style={profileStyles.greyButton}
                      onPress={() => {}}>
                      <Text style={{color: '#fff', fontSize:15}}>Help</Text>
                  </TouchableOpacity>
                </View>
              </View>  
              
         <View style={{marginHorizontal:20,alignItems:'center',flex:1}}> 
        <TouchableOpacity style={profileStyles.greyButton}
            onPress={() => {}}>
            <Text style={{color: '#fff', fontSize:17}}>Logout</Text>
        </TouchableOpacity>

      </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  
  
});
