import React, { Component } from 'react'
import FiveDayScreen from '../five_date/FiveDayScreen'
import CalendarOverviewScreen from '../calendar_overview/CalendarOverviewScreen'
import { createStackNavigator } from '@react-navigation/stack';
import DoneListScreen from '../doneList/DoneListScreen';
import TaskDetail from '../five_date/TaskDetail';
const Stack = createStackNavigator();

export default class HomeScreen extends Component {


    render() {
        
       
            return (
                
                <Stack.Navigator headerMode='none' initialRouteName='Home'>
                    <Stack.Screen name="Home" component={FiveDayScreen} />
                    <Stack.Screen name="CalendarOverview" component={CalendarOverviewScreen} />
                    <Stack.Screen name="DoneListOverview" component={DoneListScreen}/>
                    <Stack.Screen name="TaskDetail" component={TaskDetail}/>
                </Stack.Navigator>
            )
       
        
    }
}
