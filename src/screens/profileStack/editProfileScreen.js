import React,{useState} from 'react';
import { View, 
StyleSheet,
SafeAreaView,
Text,
Image,
ScrollView,
TextInput,
TouchableOpacity, } from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import images from '../../images';
import profileStyles from './profileStyle';


const ProfileScreen = ({navigation}) => {
   const [data, setData] = React.useState([]);

    return (
      <SafeAreaView style={profileStyles.container}>
        <ScrollView>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <View style ={profileStyles.profileImage}>
          <Avatar.Image 
            source={images.logo}
            size={120}
          />
          </View>
          
          <View style ={profileStyles.changeProfileImage}>
            <Icon name="camera" color={'#fff'} size={17}/>
          </View>
        </View>  
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Name</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="John Doe"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Contact Number</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="1234567890"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Email</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="sample@gmail.com"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Address</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="23, jaipur"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Business Name</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="Lorem Ipsum"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Business Type</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="Lorem Ipsum"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Registration Number</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="2534678"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20,}}>
          <Text style={profileStyles.text_footer}>Business Name</Text>
          <View style={profileStyles.pickerAction}>
            <Picker
              style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
              // selectedValue={data}
              // onValueChange={(val) => accountTypeInputChange(val)}
            >
            <Picker.Item label="Pharmacy" value="Pharmacy" />
            <Picker.Item label="Florist" value="Florist" />
            <Picker.Item label="Documents" value="Documents" />
          </Picker>
          <View style={profileStyles.arrowWrapper}>
            <Text style={profileStyles.arrow}>&#9660;</Text>
          </View> 
          </View>
          
          <Text style={profileStyles.text_footer}>Facebook (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="2534678"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
            <Image source={images.facebook} style={profileStyles.icon}/>
          </View>
        
          <Text style={profileStyles.text_footer}>Linkedin (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="2534678"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
            <Image source={images.linkedIn} style={profileStyles.icon}/>
          </View>
        
          <Text style={profileStyles.text_footer}>Twitter (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="2534678"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            />
            <Image source={images.twitter} style={profileStyles.icon}/>  
          </View>
      
          <Text style={profileStyles.text_footer}>Instagram (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholder="2534678"
              placeholderTextColor = "#fff"
              style={profileStyles.textInput}
              autoCapitalize="none"
              //onChangeText={(val) => contactNoInputChange(val)}
            /><Image source={images.instagram} style={profileStyles.icon}/>
          </View>
        </View>
        {/* <View style={[profileStyles.editProfile,{flex:0.5,alignSelf:'flex-end'}]}>
          <TouchableOpacity style={[profileStyles.greyButton]} onPress={() => {}}>
            <Text style={{color: '#fff', fontSize:15}}>Change Password</Text>
          </TouchableOpacity>
        </View>  */}
        <View style={{flexDirection: 'row',justifyContent: 'space-between', flex:1,marginHorizontal:20}}>  
          <View style={[profileStyles.columnSection,{marginLeft:-10}]}>
            </View> 
           <View style={[profileStyles.columnSection,{marginRight:10}]}>
              <TouchableOpacity style={profileStyles.greyButton}
                  onPress={() => {}}>
                  <Text style={{color: '#fff', fontSize:15}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default ProfileScreen;

