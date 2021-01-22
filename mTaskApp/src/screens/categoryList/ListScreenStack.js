import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './ListScreen';
import ListDetail from './ListDetail';
import TaskDetail from '../five_date/TaskDetail';
import DoneTasksByList from './DoneTasksByList';

const Stack = createStackNavigator();

export default class ListScreenStack extends Component {
    render() {
        return (
            <Stack.Navigator headerMode='none' initialRouteName='Home'>
                <Stack.Screen name="Home" component={ListScreen}/>
                <Stack.Screen name="ListDetail" component={ListDetail}/>
                <Stack.Screen name="TaskDetail" component={TaskDetail}/>
                <Stack.Screen name="DoneTasksByList" component={DoneTasksByList}/>
            </Stack.Navigator>
        )
    }
}
