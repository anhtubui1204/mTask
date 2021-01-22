import React, { Component } from 'react';
import { View } from 'react-native';
import {Layout, Text, Button } from '@ui-kitten/components';
import moment from 'moment';


export default class TimeFormat extends Component {

    constructor(props) {
        super(props);
        this.data = props.time;
    }


    render() {
        const time = moment( this.data || moment.now() ).format('MMMM Do YYYY, h:mm:ss a');

        return (
            <Text style={{fontSize:15, textAlign:'center'}}>{time}</Text>
        )
    }
}
