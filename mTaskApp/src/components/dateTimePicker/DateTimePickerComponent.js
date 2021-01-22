import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Modal,TouchableOpacity, TouchableHighlight } from 'react-native'
import { Button, Text } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons, Feather } from '@expo/vector-icons';
// import {  } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const DateTimePickerComponent = ({
    dateVisible,
    timeVisible,
    onChangeDate,
    onChangeTime,
    setDatePickerVisible,
    setTimePickerVisible,
    dateValue,
    timeValue, 
    onResetDateTime }) => {

    const os = Platform.OS

    // console.log(onDisplay)

    const DateTimePicker = () => {
        return (
            <>
                <View>
                    <DateTimePickerModal
                        // onHide = {onHide}
                        isVisible={dateVisible}
                        date={dateValue}
                        mode="date"
                        display="calendar"
                        onConfirm={(date)=> {
                            onChangeDate(date)
                            // setOnDisplayDate(true)
                        }}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                </View>
                <View>
                    <DateTimePickerModal
                        headerTextIOS='Pick a time'
                        // onHide={onHide}
                        isVisible={timeVisible}
                        date={timeValue}
                        mode="time"
                        display={os === 'ios' ? "default" : "spinner"}
                        onConfirm={(time)=>{
                            onChangeTime(time)
                            // setOnDisplayTime(true)
                        }}
                        onCancel={() => setTimePickerVisible(false)}
                    />
                </View>
            </>
        )
    }

    return (
        <>
            <View style={{ flexDirection: "row", marginTop: 5, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ paddingRight: 5 }}
                    onPress={() => {
                        setDatePickerVisible(true)
                        setTimePickerVisible(false)
                    }}
                >
                    <MaterialIcons name="date-range" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => {
                        setTimePickerVisible(true)
                        setDatePickerVisible(false)
                    }}
                >
                    <Feather name="clock" size={22} color="black" />
                </TouchableOpacity>

            </View>
            <DateTimePicker />
        </>
    )
}

const styles = StyleSheet.create({
    iosPicker: {
        position: 'absolute',
        flex: 1,
        width: '100%',
    },
    iosPickerBackground: {
        backgroundColor: 'white',
        padding: 15,
        width: windowWidth
    },
    pickerButton: {
        flex: 1,
        padding: 3
    },
    displayStyle:{
        marginLeft: 8,
        marginRight: 10,
        paddingLeft: 5,
        paddingRight: 10,
        paddingVertical: 2,
        backgroundColor: 'black',
        borderRadius: 18,
        flexDirection:'row',
         alignItems: 'center'
    }
})

export default DateTimePickerComponent
