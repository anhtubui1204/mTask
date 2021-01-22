import React, { createRef, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerComponent from '../dateTimePicker/DateTimePickerComponent'


import moment from 'moment-timezone'


const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('hh:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const TaskDate = ({dateTime, id, saveDateTime, propStyle}) => {
    const {headerStyle} = propStyle
    const refRBSheet = useRef();

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(new Date(dateTime))
    const [time, setTime] = useState(new Date(dateTime))

    const onChangeDate = (selectedDate) => {
        const currentDate = selectedDate
        setShowDatePicker(false)
        setDate(currentDate);
    };

    const onChangeTime = (selectedTime) => {
        const currentTime = selectedTime
        setShowTimePicker(false)
        setTime(currentTime);
    };

    const taskDateTime = {
        dateTime: combineDateTime(date, time)
    }

    const onResetDateTime = () => {
        setDate(new Date(dateTime))
        setTime(new Date(dateTime))
    }

    return (
        <>
            <View style={[styles.dueStyle, propStyle.borderStyle]}>
                <Feather name="calendar" size={propStyle.iconSize} color={calendarTextCol} />
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => {
                        refRBSheet.current.open()
                    }}
                >
                    <Text style={[styles.textStyle, { color: calendarTextCol }]}>{moment(dateTime).calendar()}</Text>
                </TouchableOpacity>
            </View>
            <RBSheet
                    height={300}
                    ref={refRBSheet}
                >
                    <View style={headerStyle.headerContainer}>
                        <TouchableOpacity
                            onPress={() => refRBSheet.current.close()}
                            style={headerStyle.headerButton}
                        >
                            <Text style={headerStyle.headerButtonCancel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                refRBSheet.current.close()
                                saveDateTime(id, taskDateTime)
                            }}
                            style={[headerStyle.headerButton]}
                        >
                            <Text style={headerStyle.headerButtonDone}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputGroup, { flexDirection: 'row', flex: 1}]}>
                        <DateTimePickerComponent
                            dateVisible={showDatePicker}
                            timeVisible={showTimePicker}
                            onChangeDate={onChangeDate}
                            onChangeTime={onChangeTime}
                            setDatePickerVisible={setShowDatePicker}
                            setTimePickerVisible={setShowTimePicker}
                            dateValue={date}
                            timeValue={time}
                            onResetDateTime={onResetDateTime}
                        />
                    </View>
                </RBSheet>  
        </>
    )
}

const calendarTextCol = "#BA1079"

const styles = StyleSheet.create({
    dueStyle: {
        // backgroundColor: 'gray',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingBottom: 26
    },
    touchableStyle: {
        paddingHorizontal: 20
    },
    textStyle: {
        fontSize: 15,
        color: '#6F7274'
        // height:'100%'
    },
    dateHeaderContainer: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateHeaderButton: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    dateHeaderButtonCancel: {
        fontSize: 18,
        color: "#666",
        fontWeight: "400"
    },
    dateHeaderButtonDone: {
        fontSize: 18,
        color: "#006BFF",
        fontWeight: "500"
    },
    inputGroup: {
        // width: '100%',
        marginHorizontal: 8,
        paddingVertical: 20,
        position: 'relative'
    },
    dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Lato-Regular',
        marginLeft: 15
    },
})

export default TaskDate
