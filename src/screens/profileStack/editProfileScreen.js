import React,{useState,useEffect} from 'react';
import { View, 
StyleSheet,
SafeAreaView,
Text,
Image,
ScrollView,
TextInput,
TouchableOpacity,
ActivityIndicator,
StatusBar,ToastAndroid } from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import images from '../../images';
import profileStyles from './profileStyle';
import ImagePicker from 'react-native-image-crop-picker';
import {getStateList} from '../../services/auth';


import {profileImage, updateEditProfile, getProfile} from '../../services/updateProfile';


const editProfileScreen = ({navigation}) => {
  const [data,setData] =useState([])
  const [isLoading, setLoading] = useState(true)
  const[image, setImage] = useState('')
  const[name, setName] = useState('');
  const[contactNo, setContactNo] = useState('');
  const[email, setEmail] = useState('');
  const[address1, setAddress1] = useState('');
  const[address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const[businessName, setBusinessName] = useState('');
  const[registrationNo, setRegistrationNo] = useState('');
  const [businessType, setBusinessType] = useState('');
  const[bussinessDomain, setBussinessDomain] = useState('');
  const [designation, setDesignation] = useState('');
  const[facebook, setFacebook] = useState('');
  const[linkedin, setLinkedin] = useState('');
  const[twitter, setTwitter] = useState('');
  const[instagram, setInstagram] = useState('');

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaCodeList, setAreaCodeList] = useState([]);
  const [businessTypeList, setBusinessTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [domainList, setDomainList] = useState([]);

  
  useEffect(() => {
    StateList()
      getProfile()
          .then((res) => {            
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                } 
                else {
                  {
                  setName(res.profile_details.full_name)
                  setContactNo(res.profile_details.contact_no)
                  setEmail(res.profile_details.email)
                  setAddress1(res.profile_details.adr_street)
                  setAddress2(res.profile_details.adr_building)
                  setState(res.profile_details.adr_state_id)
                  setCity(res.profile_details.adr_city)
                  setAreaCode(res.profile_details.adr_area_code)
                  setBusinessName(res.profile_details.bussiness_name)
                  setRegistrationNo(res.profile_details.registration_no)
                  setBussinessDomain(res.profile_details.business_category_id)
                  setBusinessType(res.profile_details.business_type)
                  setDesignation(res.profile_details.designation)
                  setBussinessDomain(res.profile_details.business_category_id)
                  setFacebook(res.profile_details.mer_facebook)
                  setLinkedin(res.profile_details.mer_linkedin)
                  setTwitter(res.profile_details.mer_twitter)
                  setInstagram(res.profile_details.mer_instagram)
                  setData(res.profile_details)
                  setImage(res.profile_details.profile_image)
                  }
                  setLoading(false)
                }
            }
          else {
            alert(res.message)
            }                              
          
        });
      
    }, [])

  function StateList(){
     getStateList()  
      .then((res) => {
        if (res.code == 200){
            if (res.success == "false"){
                alert(res.message)
            }
          else {

            setBusinessTypeList(res.business_type_list);
            setDesignationList(res.designation_list);
            setStateList(res.state_list);
            setCityList(res.city_list)
            setDomainList(res.business_category_list);
            setAreaCodeList(res.area_code_list);
            setLoading(false);
            };  
          
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

  const check = (text) => {

    if (text != 0) {
        return true;
    }
    else { 
        return false;
    }
  }
const UpdateProfileImage=()=>{
    ImagePicker.openCamera({
            mediaType: 'photo',
            width: 300,
            height: 400,
            cropping: true
            }).then(val => {onSuccess(val)})
    .catch(e => alert(e));
  }

  const onSuccess = (val) => {
      console.log(val)

      profileImage(val)
          .then((res) => {            
              if (res.code == 200){
                  if (res.success == "false"){
                      alert(res.message)
                  } 
                else {
                    setImage(res.profile_details.profile_image)
                  }
              }
              else {
              alert(res.message)
              }                              
          
        });
  }

    const onSave =()=>{

          if(validate(email)){

             updateEditProfile(name, contactNo,email,address1,address2,state,city,areaCode,businessName,registrationNo,businessType,
                                bussinessDomain,designation,facebook,linkedin,twitter,instagram)

            .then((res) => {
           console.log("check__",res);
                     
          if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          } 
          else {
          alert(res.message)
          navigation.navigate('ProfileScreen')
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
          else{
            ToastAndroid.showWithGravityAndOffset(
                "Please Enter Correct Email ",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
          }
        }
         
    

   const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false;
        }
        else {
            
            return true;
        }
    }
      
 if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  else{
    return (
      <SafeAreaView style={profileStyles.container}>
      <StatusBar backgroundColor='#000' barStyle="light-content"/>  
        <ScrollView style={{marginBottom:80}}>
        <TouchableOpacity onPress={()=>UpdateProfileImage()}>
          <View style={{alignItems:'center', justifyContent:'center'}}>
            
            <View style ={profileStyles.profileImage}>
            
              <Avatar.Image 
              source={{uri:image}}
                size={120}
              />
              </View>
              
              <View style ={profileStyles.changeProfileImage}>
                <Icon name="camera" color={'#fff'} size={20}/>
              </View>
          </View> 
        </TouchableOpacity> 

        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Name</Text>
          <View style={profileStyles.action}>
             <TextInput 
              placeholderTextColor = "#fff"
              value={name}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setName(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Contact no.</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={contactNo}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setContactNo(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Email</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={email}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Address</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={address1}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setAddress1(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Apt, Building, Gate code etc,</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={address2}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setAddress2(val)}
            />
          </View>
        </View>

        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>State</Text>
          <View style={profileStyles.pickerAction}>
            <Picker
              style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
              selectedValue={state}
              onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
              {stateList.map((item, key)=>
              <Picker.Item label={item.state_name} value={item.id} key={item.id} />)}
            </Picker>
          </View>
        </View>

       
            <View style={{paddingHorizontal: 22,}}>
              <Text style={profileStyles.text_footer}>City</Text>
            <View style={profileStyles.action}>
              <View style={profileStyles.pickerAction}>
               <Picker
                    style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
                    selectedValue={city}
                    onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
                    {cityList.map((item, key)=>
                    <Picker.Item label={item.city_name} value={item.id} key={item.id} />)}
              </Picker>
          </View>
            </View>
          </View>  
          <View style={{paddingHorizontal: 22,}}>
              <Text style={profileStyles.text_footer}>Area Code</Text>
           <View style={profileStyles.pickerAction}>

            <Picker
              style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
              selectedValue={areaCode}
              onValueChange={(itemValue, itemIndex) => setAreaCode(itemValue)}>
              {areaCodeList.map((item, key)=>
              <Picker.Item label={item.areacode} value={item.id} key={item.id} />)}
            </Picker>
          </View>

          </View>
      
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Name</Text>
          <View style={profileStyles.action}>
             <TextInput 
              placeholderTextColor = "#fff"
              value={businessName}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setBusinessName(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Registration no.</Text>
          <View style={profileStyles.action}>
           <TextInput 
              placeholderTextColor = "#fff"
              value={registrationNo}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setRegistrationNo(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Type</Text>
          <View style={profileStyles.pickerAction}>
            <Picker
              style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
              selectedValue={businessType}
              onValueChange={(itemValue, itemIndex) => setBusinessType(itemValue)}>
              {businessTypeList.map((item, key)=>
              <Picker.Item label={item.bussiness_type_name} value={item.id} key={item.id} />)}
            </Picker>
            
          </View>
        </View>
          <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Designation</Text>
           <View style={profileStyles.pickerAction}>      
            <Picker
              style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
              selectedValue={designation}
              onValueChange={(itemValue, itemIndex) => setDesignation(itemValue)}>
              {designationList.map((item, key)=>
              <Picker.Item label={item.designation_name} value={item.id} key={item.id} />)}
            </Picker>
              </View>  
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Domain</Text>
         <View style={profileStyles.pickerAction}>      
            <Picker
              style={profileStyles.picker} itemStyle={profileStyles.pickerItem}
              selectedValue={bussinessDomain}
              onValueChange={(itemValue, itemIndex) => setBussinessDomain(itemValue)}>
              {domainList.map((item, key)=>
              <Picker.Item label={item.category_name} value={item.id} key={item.id} />)}
            </Picker>
          </View>  
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Facebook (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={facebook}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setFacebook(val)}
            />
            <Image source={images.facebook} style={profileStyles.icon}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Linkedin (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={linkedin}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setLinkedin(val)}
            />
            <Image source={images.linkedIn} style={profileStyles.icon}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Twitter (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={twitter}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setTwitter(val)}
            />
            <Image source={images.twitter} style={profileStyles.icon}/>  
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Instagram (Optional)</Text>
          <View style={profileStyles.action}>
            <TextInput 
              placeholderTextColor = "#fff"
              value={instagram}
              style={profileStyles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setInstagram(val)}
            />
            <Image source={images.instagram} style={profileStyles.icon}/>
          </View>
        </View>
              
        <View style={{flexDirection: 'row',justifyContent: 'space-between', flex:1,marginHorizontal:20}}>  
          <View style={[profileStyles.columnSection,{marginLeft:-10}]}>
            </View> 
           <View style={[profileStyles.columnSection,{marginRight:10}]}>
              <TouchableOpacity style={profileStyles.greyButton}
                  onPress={() => {onSave()}}>
                  <Text style={{color: '#fff', fontSize:15}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
    }
};

export default editProfileScreen;

