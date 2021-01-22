import React, { createRef, useState, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Animated, I18nManager, Platform, Alert, Image } from 'react-native';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons, AntDesign, Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePickerComponent from '../dateTimePicker/DateTimePickerComponent';
import Modal from 'react-native-modal';

import { defaultColor } from '../../constants/global_variables/global-variables'

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('hh:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const RowItem = ({ item, isShowTime, isShowDate, toggleModal }) => {
    const nUsers = item.taggedUsers.length

    return (
        <Layout style={[styles.container, styles.shadowContainer]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'flex-start' }}>
                    {/* <Feather name="list" size={24} /> */}
                    <View style={{ paddingHorizontal: 12 }}>
                        <Text category="h5" style={{ fontWeight: 'bold' }}>{item.name}</Text>
                        {nUsers !== 0 && (
                            <TouchableOpacity onPress={toggleModal}>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <Icon name='people-outline' width={18} height={18} fill='#659dea' />
                                    <Text style={{ paddingHorizontal: 5 }} category="s1">{nUsers}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {isShowDate && (
                    <View style={{ justifyContent: 'center', paddingHorizontal: 5 }}>
                        <Text appearance='hint'> {moment(item.dateTime).format('LLL')}</Text>
                    </View>
                )}

                {isShowTime && (
                    <View style={{ justifyContent: 'center', paddingHorizontal: 5 }}>
                        <Text appearance='hint'> {moment(item.dateTime).format('LT')}</Text>
                    </View>
                )}

            </View>
        </Layout>
    )
}

const TaskItem = ({ item, deleteHandler, editTaskHandler, onNavigateDetail, isShowTime, isShowDate }) => {
    const scrollRef = createRef()
    const refRBSheet = useRef();

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(new Date(item.dateTime))
    const [time, setTime] = useState(new Date(item.dateTime))

    const [modalVisible, setModalVisible] = useState(false)

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


    const renderLeftActions = (progress) => {

        const renderDeleteAction = (text, color, x, progress) => {
            const trans = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0],
            });
            const pressHandler = () => {
                deleteHandler(item)
                refRBSheet.current.close()
            }
            return (
                <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                    <RectButton style={[styles.btnAction, { backgroundColor: color }]} onPress={pressHandler}>
                        <Text style={styles.actionText}>
                            <Octicons name="trashcan" size={20} />
                        </Text>
                    </RectButton>
                </Animated.View>
            );
        }

        const renderDelayAction = (text, color, x, progress) => {
            const trans = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0],
            });
            const pressHandler = () => {
                refRBSheet.current.open()
            }
            return (
                <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                    <RectButton style={[styles.btnAction, { backgroundColor: color }]} onPress={pressHandler}>
                        <Text style={styles.actionText}>
                            {text}
                            {/* <MaterialCommunityIcons name="clock-fast" size={24}  /> */}
                        </Text>
                    </RectButton>
                </Animated.View>
            );
        }

        return (
            <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' }}>
                {renderDelayAction('Delay', '#394F68', -64, progress)}
                {renderDeleteAction('Delete', '#EE001D', -32, progress)}
            </View>
        )
    }

    const renderMoreAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            onNavigateDetail(item._id)
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.btnAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>
                        {text}
                        {/* <Feather name="more-horizontal" size={24} /> */}
                    </Text>
                </RectButton>
            </Animated.View>
        );
    };
    const renderDoneAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            editTaskHandler(item, { completed: !item.completed }, 'complete')
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.btnAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>
                        <Feather name="check-circle" size={20} />
                    </Text>
                </RectButton>
            </Animated.View>
        );
    };
    const renderRightActions = progress => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            {renderMoreAction('More', '#65AEE0', 192, progress)}
            {renderDoneAction('Done', '#4CBB87', 128, progress)}
        </View>
    );

    const toggleModal = () => {
        setModalVisible(true)
        console.log(item.taggedUsers)
    }

    return (

        <View>
            <Swipeable
                ref={scrollRef}
                friction={2}
                leftThreshold={40}
                // rightThreshold={40}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
            >
                <RowItem item={item} isShowTime={isShowTime} isShowDate={isShowDate} toggleModal={toggleModal} />
            </Swipeable>

            <Modal
                isVisible={modalVisible}
                backdropColor='black'
                backdropOpacity={0.5}
            // hasBackdrop={false}
                onBackdropPress={()=>setModalVisible(false)}

            >
                <View style={{ marginVertical: 20 }}>
                    <View style={[styles.modalView, styles.shadowContainer]} >
                        <View style={styles.modalList}>
                            <FlatList
                                data={item.taggedUsers}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ flexDirection: 'row', paddingBottom: 2, alignItems: 'center' }}>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={{
                                                    uri: item.displayPhoto,
                                                }}
                                            />
                                            <Text style={{ fontSize: 16, fontWeight: '600', paddingHorizontal: 8 }}>{`${item.fName} ${item.lName}`}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <TouchableOpacity style={{
                            alignSelf: 'center',
                            borderRadius: 20,
                            padding: 10
                            // elevation: 2
                        }} onPress={() => setModalVisible(false)}>
                            <Text category='s1' style={{ color: defaultColor }}>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            <RBSheet
                height={300}
                ref={refRBSheet}
            >
                <View style={styles.dateHeaderContainer}>
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.close()}
                        style={styles.dateHeaderButton}
                    >
                        <Text style={styles.dateHeaderButtonCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheet.current.close()
                            editTaskHandler(item, taskDateTime)
                        }}
                        style={[styles.dateHeaderButton]}
                    >
                        <Text style={styles.dateHeaderButtonDone}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup, { flexDirection: 'row', flex: 1, marginHorizontal: 10 }}>
                    <DateTimePickerComponent
                        dateVisible={showDatePicker}
                        timeVisible={showTimePicker}
                        onChangeDate={onChangeDate}
                        onChangeTime={onChangeTime}
                        setDatePickerVisible={setShowDatePicker}
                        setTimePickerVisible={setShowTimePicker}
                        dateValue={date}
                        timeValue={time}
                    />
                </View>
            </RBSheet>
        </View>
    );

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#EEF7FA'
    },
    button: {
        margin: 0
    },
    container: {
        marginVertical: 5,
        marginHorizontal: 3,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        flex: 1,
        // backgroundColor: '#EEF7FA'
    },
    // rowFront: {
    //     marginTop: 2,
    //     backgroundColor: '#EEF7FA',
    //     // justifyContent: 'center',
    //     borderRadius: 12
    // },
    leftAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontWeight: 'bold'
        // padding: 10,
    },
    btnAction: {
        marginVertical: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'white',
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
        width: '100%',
        paddingVertical: 8,
        position: 'relative'
    },
    dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Lato-Regular',
        marginLeft: 15
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

})

export default TaskItem