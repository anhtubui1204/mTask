import React, { Component } from 'react';
import { Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity, AsyncStorage, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default class Profile extends Component {
  
  constructor(props, navigation) {
    super(props, navigation);
    this.state = {
      userInfo: null,
      isLoadding: true,
      isLoggedIn: 'false',
      userId:''
    }
  }

  componentDidMount = async () => {
    try{
      let user = await AsyncStorage.getItem('user');
      let status = await AsyncStorage.getItem('isLoggedIn');
      let userid = await AsyncStorage.getItem('userId');
      // console.log(userid)
      this.setState({userInfo: JSON.parse(user)});
      this.setState({userId: userid});
      this.setState({isLoadding: false});
    }catch(error){
      alert(error);
    }
  }

  handleLogOut(){
    console.log(this.state.userId)
    this.props.navigation.navigate('Login');
    AsyncStorage.setItem('isLoggedIn', this.state.isLoggedIn);
  }
  get button(){
    //AsyncStorage.setItem('isLoggedIn', this.state.isLoggedIn);
    return(
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleLogOut()}>
        <Text>Log out</Text>  
      </TouchableOpacity>
    )
  }
    render(){
      if(this.state.isLoadding) {
        return(
          <View style={styles.loadding}>
            <ActivityIndicator/>
          </View>
        )
      }else{
        return (
          
          <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: this.state.userInfo.picture.data.url}}/>
            <View style={styles.body}>
              <View style={{ alignItems:'center', justifyContent:'center',}}>
                 <Text style={{marginTop:30,fontSize:28,color: "#696969",fontWeight: "600"}}>{this.state.userInfo.name}</Text>
                 <Text style={styles.info}>Facebook Account:</Text>
                 <Text style={{alignItems:'center', justifyContent:'center',fontSize:16}}>{this.state.userInfo.email}</Text>
                  {this.button}
              </View>
            </View>
          </View>
        );

      }
    }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#659dea",
    height:200,
  },
  loadding:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
 
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:20,
    color: "#3b5998",
    marginTop:10
  },
  
  buttonContainer: {
    marginTop:100,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#659dea",
  },
});
