import { View, Text, Image, StyleSheet } from 'react-native';
import React, { Component } from 'react';


import Onboarding from 'react-native-onboarding-swiper'; // 0.4.0

export default class OnboardingScreen extends Component {


    constructor(props, navigation) {
        super(props, navigation);
    }
    


  render() {
    return (
        <Onboarding
        skipToPage={3}
        //onSkip={() => this.props.navigation.navigate('Login')}
        onDone={() => this.props.navigation.navigate('Login')}
        transitionAnimationDuration = {300}
        pages={[
          {
            backgroundColor: '#659dea',
            image: <Image style = {styles.logo1} source={require('../../../assets/easier_life.png')} />,
            title: 'Five Day Schedule',
            subtitle: 'Manage your task with a fancy five day view schedule',
          },
          {
            backgroundColor: '#5a5aff',
            image: <Image style = {styles.logo2} source={require('../../../assets/list.png')} />,
            title: 'Create Your Own List',
            subtitle: 'Store a collection of tasks inside the list',
          },
          {
            backgroundColor: '#366bf2',
            image: <Image style = {styles.logo3} source={require('../../../assets/tag_friend.png')} />,
            title: 'Share With Your Friend',
            subtitle: 'You can invite your friend to your task !',
          },
          {
            backgroundColor: '#659dea',
            image: <Image style = {styles.logo4} source={require('../../../assets/ready_to_login.png')} />,
            title: 'You Are Ready !',
            subtitle: "Go login with your Facebook account !",
          },
        ]}
      />
    );
  }
}

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

    logo1:{
      resizeMode: "contain",
      height: 300,
      width: 300,
      //marginBottom:10,
    },
    logo2:{
        resizeMode: "contain",
        height: 280,
        width: 300,
        //marginBottom:10,
    },
    logo3:{
        resizeMode: "contain",
        height: 280,
        width: 300,
        //marginBottom:10,
    },
    logo4:{
        resizeMode: "contain",
        height: 280,
        width: 300,
        //marginBottom:10,
    },
  });