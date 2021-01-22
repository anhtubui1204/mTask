import React, { Component, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import HomeScreen from '../../screens/home_screen/HomeScreen';
import ProfileScreen from '../../screens/userProfile/Profile';
import NotificationScreen from '../../screens/notification/NotificationScreen'
import NotificationListing from '../../screens/notification/NotificationListing'
import registerForPushNotificationsAsync from '../push_notification/API/register-for-push-notification'
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import {  View, Button, Vibration, Platform, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import ListScreenStack from '../../screens/categoryList/ListScreenStack';
const BottomTab = createBottomTabNavigator();

const PersonIcon = (style) => (
    <Icon {...style} name='person-outline' />
);

const BellIcon = (style) => (
        <Icon {...style} name='bell-outline' />
);

const HomeIcon = (style) => (
    <Icon {...style} name='home-outline' />
);

const ListIcon = (style) => (
    <Icon {...style} name='list-outline' />
);

const BottomTabBar = ({ navigation, state }) => {

    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <SafeAreaView>
            <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
                <BottomNavigationTab  icon={ListIcon} />
                <BottomNavigationTab  icon={HomeIcon} />

                <BottomNavigationTab  icon={BellIcon} />
                <BottomNavigationTab  icon={PersonIcon} />
            </BottomNavigation>
        </SafeAreaView>
    );
};

const TabNavigator = () => (
    <BottomTab.Navigator initialRouteName='Home' tabBar={props => <BottomTabBar {...props} />}>
        <BottomTab.Screen name='List' component={ListScreenStack} />
        <BottomTab.Screen name='Home' component={HomeScreen} />

        <BottomTab.Screen name='Notifications' component={NotificationListing} />
        <BottomTab.Screen name='Users' component={ProfileScreen} />

    </BottomTab.Navigator>
);

export default class BottomNavBar extends React.Component {
    state = {
        expoPushToken: '',
        notification: {},
      };

    async componentDidMount() {
        await registerForPushNotificationsAsync(this);
    
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        


        // let result = await   
        // Permissions.askAsync(Permissions.NOTIFICATIONS);
        // if (Constants.lisDevice && resut.status === 'granted') {
        // console.log('Notification permissions granted.')
        // }
        // var localNotification ={
        //     title: 'testing a scheduled local notification',
        //     body: 'A body of notification.'
        // }
        // var schedulingOptions = {
        //     time: (new Date()).getTime() + 3000,
        //     repeat: 'minute'
        // }
        // var res = await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
        // alert(res)
        var cancelAllNotification = await Notifications.cancelAllScheduledNotificationsAsync()



      }

      _handleNotification = notification => {
        // alert('received notifications')

        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
      };

        render(){
            return (
                <React.Fragment>
                    <TabNavigator />
                   
                </React.Fragment>
            )
        }
        
}
