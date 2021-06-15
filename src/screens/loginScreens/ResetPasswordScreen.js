import React from 'react';
import { View, 
    Alert,
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar, 
    Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ResetPasswordScreeen = ({ navigation }) => {

  const [data, setData] = React.useState({
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
  const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

  const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

  const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

  const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
  const onSubmit =() => {
        Alert.alert('Password Changed', 'You can now sign in with new password.');

  }
  return (
     <View style={styles.container}>
          <StatusBar backgroundColor='#000' barStyle="light-content"/>

         
        <View style={styles.header}>
            <Animatable.Image 
              animation="fadeInUpBig"
              duraton="2000"
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="stretch"
            >
            </Animatable.Image>
        </View >

        <Animatable.View 
          animation="fadeInUpBig"
          style={styles.footer}
        >
            <Text style={styles.text_header}>Reset Password</Text>
            
           <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor = "#fff"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Confirm Your Password"
                    placeholderTextColor = "#fff"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
  
                <TouchableOpacity
                    onPress={() => { onSubmit();navigation.navigate('SignInScreen') }}
                    
                    style={[styles.submit, {
                      borderColor: '#fff',
                      borderWidth: 1,                        
                    }]}
                >
                    <Text style={[styles.buttontext, {
                      color: '#fff'
                    }]}>Submit</Text>
                </TouchableOpacity>             
                
               
            </View>     
        </Animatable.View>    
        
                
    </View>
  );
}



const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000'
    },
    header: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logo: {
      width: height_logo,
      height: height_logo, 
     
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
      paddingBottom: 20,
      paddingTop: 10,
    },
    footer: {
        flex:1,
        backgroundColor: '#151515',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30, 
        
    },
    emailImage:{
      
      width: 100,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode:'center',
      tintColor: '#fff'

    },
    picture:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#fff',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        
    },
    submit: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttontext: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    normalText:{
        color: '#fff', 
        marginTop:15,

    }
  });

  export default ResetPasswordScreeen;