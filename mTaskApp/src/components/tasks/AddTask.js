import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Platform, AsyncStorage } from 'react-native'
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePickerComponent from '../dateTimePicker/DateTimePickerComponent'
import TagUser from '../taskDetail/TagUser';
import { MaterialIcons } from '@expo/vector-icons';
import TaskDesc from '../taskDetail/TaskDesc';
import Modal from 'react-native-modal';
import { clearSelectedAction } from '../../actions/tag-members-actions';

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('hh:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const AddTask = ({ submitHandler, onResizeBtnSheet }) => {
    const os = Platform.OS
    const tag = useSelector(state => state.tagMemberReducer.selectedItems, [])
    const now = new Date(Date.now())

    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')

    const [desc, setDesc] = useState('')
    const [descInput, setDescInput] = useState(false)

    const [onDisplayDate, setOnDisplayDate] = useState(false)
    const [onDisplayTime, setOnDisplayTime] = useState(false)

    const taggedUsers = useSelector(state => state.tagMemberReducer.selectedItems, [])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(now)
    const [time, setTime] = useState(now)

    // console.log(moment(now).add(1,'days').format('LL'))
    const displayDate = ()=> {
        const dateString = moment(date).format('LL')
        if(onDisplayDate) {
            if (dateString === moment(now).format('LL')) return `Today ${dateString}`
            if (dateString === moment(now).add(1,'days').format('LL')) return `Tomorrow ${dateString}`
            else return dateString 
        } else return ''
    }
    // const displayDate = onDisplayDate? moment(date).calendar() :''
    const displayTime = onDisplayTime ? moment(time).format('LT') : ''

    const onResetDateTime = () => {
        setDate(now)
        setTime(now)
    }

    const onChangeDate = (selectedDate) => {
        const currentDate = selectedDate
        setShowDatePicker(false)
        setDate(currentDate);
        setOnDisplayDate(true)
    };

    const onChangeTime = (selectedTime) => {
        const currentTime = selectedTime
        setShowTimePicker(false)
        setTime(currentTime);
        setOnDisplayTime(true)
    };

    const onHide = () => {
        setOnDisplayDate(false)
        setOnDisplayTime(false)
        onResetDateTime()
    }

    console.log(desc)

    const taskData = {
        name: name,
        description: desc,
        dateTime: combineDateTime(date, time),
        taggedUsers: tag,
        creatorId: userId
    }

    const getUserId = async () => {
        try {
            let id = await AsyncStorage.getItem('userId')
            setUserId(id)
        } catch (err) {
            console.log(err)
        }
    }

    const openDescInput = () => {
        setDescInput(!descInput)
        // if (descInput) onResizeBtnSheet(-60)
        // else onResizeBtnSheet(60)
    }

    useEffect(() => {
        getUserId()
    }, [])

    return (
        <View style={styles.containter}>
            <View style={styles.inputGroup}>
                <Input
                    // multiline={true}
                    keyboardType='default'
                    returnKeyType='done'
                    // onKeyPress={handleKeyDown}
                    onSubmitEditing={()=>{
                        submitHandler(taskData)
                        setName('')
                        setOnDisplayTime(false)
                        setTime(now)
                        setDesc('')

                    }}
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='New Task ...'
                    autoFocus={true}
                />
            </View>


            <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center' }]}>
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

                <View style={{ justifyContent: 'center', marginTop: 5, paddingHorizontal: 5 }}>
                    <TagUser propStyle={{ headerStyle: headerStyle }} tagType={'icon'} isSaveTag={false} />
                </View>
                <View style={{ justifyContent: 'center', marginTop: 5, paddingLeft: 5 }}>
                    <TaskDesc addType={'button'} desc={desc} setDesc={setDesc} isSaveDesc={false} />
                </View>

                {/* <Modal
                    isVisible={descInput}
                    backdropColor='black'
                    backdropOpacity={0.8}
                    // hasBackdrop={false}
                    onBackdropPress={() => setDescInput(false)}

                >
                    <View style={{ marginVertical: 15 }}>
                        <View style={[styles.modalView, styles.shadowContainer]} >
                            <Input
                                value={desc}
                                onChangeText={setDesc}
                                multiline={true}
                                textStyle={{ minHeight: 86 }}
                                placeholder='Multiline'
                            // {...multilineInputState}
                            />
                        </View>
                    </View>
                </Modal> */}
            </View>

            {((onDisplayDate || onDisplayTime) || (taggedUsers && taggedUsers.length !== 0) || (desc !== '')) && (
                <View style={styles.dividerStyle}>
                <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center' }]}>
                    {(onDisplayDate || onDisplayTime) && (
                        <View style={styles.displayStyle}>
                            <TouchableOpacity onPress={onHide}>
                                <MaterialIcons name="cancel" size={18} color="white" />
                            </TouchableOpacity>
                            <Text category='c1' style={{ color: 'white', paddingLeft: 5 }}>{`${displayTime} ${displayDate()}`}</Text>
                        </View>
                    )}
                    {(taggedUsers && taggedUsers.length !== 0) && (
                        <TouchableOpacity onPress={()=>console.log('Clear Tag')}>
                            <View style={styles.displayStyle}>
                            <View style={{ flexDirection: 'row', alignItems: "center", paddingLeft: 2 }}>
                                <Icon name='people-outline' width={16} height={18} fill='#ffffff' />
                                <Text style={{ paddingLeft: 2, color: 'white' }} category="c1">{taggedUsers.length}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )}
                    {(desc !== '') && (
                        <TouchableOpacity onPress={()=>setDesc('')}>
                            <View style={styles.displayStyle}>
                                <MaterialIcons name="text-fields" size={18} color="white" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                </View>
            )}

            

            <View style={{ paddingTop: 5 }}>
                <Button style={styles.submitButton} onPress={() => submitHandler(taskData)}>Add</Button>
            </View>
        </View>
    )
}

const headerStyle = {
    headerContainer: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerButton: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    headerButtonCancel: {
        fontSize: 18,
        color: "#666",
        fontWeight: "400"
    },
    headerButtonDone: {
        fontSize: 18,
        color: "#006BFF",
        fontWeight: "500"
    },
}

const styles = StyleSheet.create({
    containter: {
        flex: 1
    },
    input: {
        marginVertical: 3,
        // marginHorizontal: 10,
        // flex: 1
    },
    submitButton: {
        justifyContent: 'center',
        margin: 8,
        backgroundColor: '#1E262C',
        borderStartColor: "transparent"
    },
    inputGroup: {
        marginHorizontal: 10
    },
    dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Lato-Regular',
        marginLeft: 15
    },
    pickerButton: {
        flex: 1,
        margin: 3
    },
    iosPicker: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        // height:'100%',
        // bottom: '50%'
    },
    iosPickerBackground: {
        backgroundColor: 'white',
        padding: 15,
        // position: "absolute",
    },
    displayStyle: {
        marginTop: 5,
        // marginLeft: 8,
        marginRight: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: 'black',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    modalView: {
        backgroundColor: 'white',
        paddingBottom: 5,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    tinyLogo: {
        width: 45,
        height: 45,
        margin: 2,
        borderRadius: 5
    },
    dividerStyle: {
        marginTop: 10,
        paddingTop: 5,
        borderTopColor: '#D1D5D8',
        borderTopWidth: 1
    }
})

export default AddTask