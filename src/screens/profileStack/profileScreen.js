import React,{useState,useEffect} from 'react';
import { View, 
StyleSheet,
SafeAreaView,
Text,
Image,
ScrollView,
TouchableOpacity, 
StatusBar,
TextInput,
ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../images';
import profileStyles from './profileStyle';
import {profileImage, getProfile} from '../../services/updateProfile';
import ImagePicker from 'react-native-image-crop-picker';
import{ AuthContext } from '../../components/context';
import { AirbnbRating } from 'react-native-elements';
import {logout} from '../../services/auth';

const ProfileScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const[image, setImage] = useState('');

    const { signOut } = React.useContext(AuthContext);

    useFocusEffect(
    React.useCallback(() => {
      const intervalId= setInterval(()=> ProfileGet(), 2000)

      console.log('ProfileGet was focused');
      // Do something when the screen is focused
      return () => {
        clearInterval(intervalId)
        console.log('ProfileGet was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
    );

    useEffect(() => {
     ProfileGet()
      
    }, [])

    function ProfileGet() {
       getProfile()
          .then((res) => {            
              if (res.code == 200){
                  if (res.success == "false"){
                      alert(res.message)
                  } 
                  else {
                    setData(res.profile_details)
                    setImage(res.profile_details.profile_image)
                    setLoading(false)
                    }
              }
            else {
              alert(res.message)
            }                              
          
        });
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

  function logoutButton() {  
    logout()
      .then((res) => {            
        if (res.code == 200){
          if (res.success == "false"){
              console.log(res)
          } 
          else {
              console.log(res)
               signOut()
            }
        }
        else {
          alert(res.message)
        }                                  
    }); 
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

        <View style ={{flexDirection:'row'}}>
        <View style ={[profileStyles.editProfile,{alignSelf:'flex-start',}]}>
          <AirbnbRating 
            isDisabled={true}
            showRating={false}
            defaultRating={data.total_rating}
            size={19}
          /> 
        </View>

         <TouchableOpacity style= {profileStyles.editProfile} onPress={() => navigation.navigate('editProfileScreen')}>
             <Icon name="edit" color={'#fff'} size={19}/>
         </TouchableOpacity>
        </View>
        

        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Name</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.full_name}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Contact no.</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.contact_no}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Email</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.email}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Address</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.adr_street}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Apt, Building, Gate code etc,</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.adr_building}</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>State</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.state_name}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row',paddingHorizontal: 22,justifyContent: 'space-between',}}>  
            <View style={[profileStyles.columnSection,]}>
              <Text style={profileStyles.text_footer}>City</Text>
            <View style={profileStyles.action}>
              <Text style= {profileStyles.showtext}>{data.city_name}</Text>
            </View>
          </View>  
          <View style={[profileStyles.columnSection,]}>
              <Text style={profileStyles.text_footer}>Area Code</Text>
            <View style={profileStyles.action}>
              <Text style= {profileStyles.showtext}>{data.area_code_name}</Text>
            </View>
          </View>
        </View>


        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Name</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.bussiness_name}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Registration no.</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.registration_no}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Type</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.bussiness_type_name}</Text>
          </View>
        </View>
          <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Designation</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.designation_name}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Business Domain</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.business_category_name}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Facebook (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.mer_facebook}</Text>
            <Image source={images.facebook} style={profileStyles.icon}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Linkedin (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.mer_linkedin}</Text>
            <Image source={images.linkedIn} style={profileStyles.icon}/>
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Twitter (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.mer_twitter}</Text>
            <Image source={images.twitter} style={profileStyles.icon}/>  
          </View>
        </View>
        <View style={{paddingHorizontal: 22,}}>
          <Text style={profileStyles.text_footer}>Instagram (Optional)</Text>
          <View style={profileStyles.action}>
            <Text style= {profileStyles.showtext}>{data.mer_instagram}</Text>
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
                      onPress={() => navigation.navigate('HelpCenterList')}>
                      <Text style={{color: '#fff', fontSize:15}}>Help</Text>
                  </TouchableOpacity>
                </View>
              </View>  
              
         <View style={{marginHorizontal:20,alignItems:'center',flex:1}}> 
        <TouchableOpacity style={profileStyles.greyButton}
             onPress={() => {logoutButton()}}>
            <Text style={{color: '#fff', fontSize:17}}>Logout</Text>
        </TouchableOpacity>

      </View>
        </ScrollView>
      </SafeAreaView>
    );  
  }  
};

export default ProfileScreen;

