
import React, { Component } from 'react';
import { Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity, AsyncStorage, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Expo from 'expo';
import * as Facebook from 'expo-facebook';
import axios  from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class Login extends Component {
  constructor(props, navigation) {
    super(props, navigation);
    this.state = {
      userInfo: null,
      isLoggedIn: 'true',
      userId: ''
      //isLoadding: true

    }

  }


  async postMethod (){
    console.log('Post function called')
    try{
      await fetch('https://bigquery-project-medium.df.r.appspot.com/simple-facebook-login', {
        method:'post',
        mode:'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.userInfo.email,
          fName: this.state.userInfo.first_name,
          lName: this.state.userInfo.last_name,
          displayPhoto: this.state.userInfo.picture.data.url
        })
      });

    }catch(e){
      console.log(e)
    }
  }   

  async getUserId() {
    // Simple POST request with a JSON body using fetch
    var resp = await axios.post('https://bigquery-project-medium.df.r.appspot.com/get-user-by-email', {email: this.state.userInfo.email})
    var data = resp.data._id
    this.setState({userId: data})
    console.log(this.state.userId)
    AsyncStorage.setItem('userId', this.state.userId);
    console.log('user:', this.state.userId)
    
}


  async logInFB() {
    try {
      await Facebook.initializeAsync('3153512351365949');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,first_name,last_name,id,name,picture.type(large)`);
       // break;
        let clone = response.clone();
        const json = await clone.json();
        this.setState({userInfo: json});
        
        //this.postMethod2();
        this.postMethod();
        this.getUserId();

        //save user info to Async storage

        //AsyncStorage.setItem('userId', this.state.userId);
        AsyncStorage.setItem('user', JSON.stringify(this.state.userInfo));
        AsyncStorage.setItem('isLoggedIn', this.state.isLoggedIn);
        console.log(this.state.userInfo.name);
        console.log(this.state.userInfo.email);
        console.log(this.state.userInfo.first_name);
        console.log(this.state.userInfo.last_name);
        console.log(this.state.userInfo.picture.data.url);
        console.log(this.state.userInfo.id)

        Alert.alert('Welcome Back!', `Hi, ${(await response.json()).name}!`);
        this.props.navigation.navigate('MainApp')
        
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  get button(){
    return(
       <Icon.Button
       name="facebook"
       backgroundColor="#3b5998"
       onPress={() => this.logInFB()}
       {...iconStyles}
      >
       Login with Facebook
     </Icon.Button>
    )
  }
  render() {
  
    return (
        <View style={styles.container}>
           <View >
             <Image style = {styles.logo} source={require('../../../assets/14th.png')} />
          </View>
          <Text style={styles.paragraph}>
            Welcome to mTask
          </Text>
      
        {this.button}
        </View>
    );
    
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles =StyleSheet.create({
  wrapper:{
    flex:1,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ecf0f1',
    paddingLeft:40,
    paddingRight:40,
    paddingTop: 50,
  },
  header: {
    fontSize:24,
    marginBottom:60,
    color:'black',
    fontWeight:'bold',
  },
  textInput:{
    borderWidth:1,
    borderColor:'#7b7a79',
    alignSelf:'stretch',
    padding:16,
    marginBottom:20,
    backgroundColor:'#fff',
  },
  btn:{
    alignSelf:'stretch',
    backgroundColor:'#659dea',
    padding:20,
    alignItems:'center',
  },
  logo:{
    resizeMode: "contain",
    height: 100,
    width: 200,
    marginBottom:50,
  },
  paragraph:{
    margin:24,
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    color:'#34495e'
  },

});






