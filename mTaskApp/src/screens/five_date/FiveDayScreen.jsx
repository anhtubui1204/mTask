import React, { useState, useEffect, useCallback, createRef, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    View,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    RefreshControl,
    ActivityIndicator,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    TextInput,
    SectionList,
    AsyncStorage
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
import AddToDoButton from '../../components/tasks/AddTaskButton';
import { withNavigation } from 'react-navigation';

import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";

import _ from 'lodash'
import moment from 'moment-timezone'

import {defaultBtnHeight,defaultColor} from '../../constants/global_variables/global-variables'
import { getTasksAction, deleteTaskAction, addTaskAction, editTaskAction, getMyTasksAction, getTaskItemAction, clearTaskItemAction } from '../../actions/TaskAction'
import { clearSelectedAction } from '../../actions/tag-members-actions';
import TestPush from '../../components/push_notification/TestPush'
import sendPushNotification from '../../components/push_notification/API/send-push-notification'
import setLocalNotification from '../../components/push_notification/API/set-local-notification'
import { Notifications } from 'expo'
import Toast from 'react-native-root-toast';


FAIcon.loadFont();
MDIcon.loadFont();

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function between(x, min, max) {
    return x >= min && x <= max;
}

const getSections = (tasks) => {
    const tmrDay = moment().add(1, 'days').format('Do MMMM YYYY')
    const twoDay = moment().add(2, 'days').format('Do MMMM YYYY')
    const threeDay = moment().add(3, 'days').format('Do MMMM YYYY')
    const fourDay = moment().add(4, 'days').format('Do MMMM YYYY')
    const fiveDay = moment().add(5, 'days').format('Do MMMM YYYY')

    //Devide Data
    const todayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === moment().format('Do MMMM YYYY'))
    const tmrData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === tmrDay)
    const twodayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === twoDay)
    const threeDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === threeDay)
    const fourDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === fourDay)
    const fiveDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === fiveDay)

    //Define Section
    const sectionsList = [
        { title: 'Today', data: todayData },
        { title: 'Tomorrow', data: tmrData },
        { title: `${twoDay}`, data: twodayData },
        { title: `${threeDay}`, data: threeDayData },
        { title: `${fourDay}`, data: fourDayData },
        { title: `${fiveDay}`, data: fiveDayData }
    ]
    const sections = sectionsList.filter(section => section.data.length !== 0)
    return sections
}

const FiveDayScreen = (props) => {
    const [isLoading, setLoading] = useState(true);
    const scrollRef = createRef()
    const refBottomSheet = useRef(0);
    const tasks = useSelector(state => state.taskReducer.tasks, [tasks]);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false)
    const [successToastVisible, setSuccessToastVisible] = useState(false)
    const [deleteToastVisible, setDeleteToastVisible] = useState(false)

    const [btnHeight, setBtnHeight] = useState(defaultBtnHeight)

    const [taskNameInToast, setTaskNameInToast] = useState('')
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getMyTasks()
        setRefreshing(false)
    }, [refreshing]);

    const deleteHandler = async (item) => {
        setTaskNameInToast(item.name)
        setDeleteToastVisible(true)
        setTimeout(()=>{
            setDeleteToastVisible(false)
        }, 3000)

        await dispatch(deleteTaskAction(item._id))
        setLoading(!isLoading)
        // onRefresh()
    }

    const editTaskHandler = async (item, data, actionType) => {
        /**
         *  data: edit data
         *  actionType: could be edit task, or complete task
         *  item: task data // to set up toast message content
         */
        console.log('editTaskHandler: ', data)
        if(actionType ==='complete'){
            setTaskNameInToast(item.name)
            setSuccessToastVisible(true)
            setTimeout(()=>{
                setSuccessToastVisible(false)
            }, 3000)
        }
        await dispatch(editTaskAction(item._id, data))
        setLoading(!isLoading)
        // onRefresh()
    }
    
    const setUpSendingPush = async (userObj, taskObj)=>{
        let creator = await AsyncStorage.getItem('user')
        creator = JSON.parse(creator)
        let displayTime = moment(taskObj.dateTime).format('H:mm a')
        
        var {expoPushToken} = userObj
        let title = creator.name + ' tag you in a task: ' + taskObj.name
        let body = 'At ' + displayTime + '\nClick here to find out!'
        sendPushNotification(expoPushToken, title, body)
    }

    const handlePushNoti = (taskObj)=>{
        var taggedUsers = taskObj.taggedUsers
        if (taggedUsers.length >= 1) {
            for (let i = 0; i < taggedUsers.length; i++) {
                var userObj = taggedUsers[i]
                setUpSendingPush(userObj, taskObj)
            }
        }
    }

    const addTaskHandler = async (taskObj) => {
        console.log('addTAskHandler: ', taskObj)
       
        if (taskObj.name.length > 3) {
            handlePushNoti(taskObj)
            let reminderId = await setLocalNotification(taskObj.name, 'Click here to view more', taskObj.dateTime)
            taskObj.reminderId = reminderId
            console.log('reminderId: ', reminderId)
            // refBottomSheet.current.close()
            await dispatch(addTaskAction(taskObj))
            
            // onRefresh()
            setLoading(!isLoading)
            
        } else {
            Alert.alert('Warning!!!', 'Todos must be over 3 characters long', [
                { text: 'Understood' }
            ])
        }
    }

    const onNavigateDetail = (id) => {
        dispatch(getTaskItemAction(id))
            .then(() => props.navigation.navigate('TaskDetail'))
    }

    const getMyTasks = async () => {
        let id = await AsyncStorage.getItem('userId')
        console.log(id)
        dispatch(getMyTasksAction(id))
    }

    useEffect(() => {
        getMyTasks()
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [isLoading])
 
    const onLayout = (e) => {
        const width = e.nativeEvent.layout.width
        const height = e.nativeEvent.layout.height
    }

    const onResizeBtnSheet = (i) => setBtnHeight(btnHeight + i)

    //define sections
    const unDoneList = tasks.filter(task => task.completed !== true)
    const sections = getSections(unDoneList)
    const renderItem = ({ item, index }) => (
        <TaskItem
            item={item}
            index={index}
            deleteHandler={deleteHandler}
            editTaskHandler={editTaskHandler}
            onNavigateDetail={onNavigateDetail}
            isShowTime={true}
        />
    )
    const renderSectionHeader = ({ section }) => <Text style={styles.SectionHeaderStyle} >{section.title}</Text>
    return (
        <>  
            <TopNavigationBar {...props} />

          
            <Layout style={styles.container} >
                <View style={styles.list} >
                    <Text style={styles.title} category='h1'>Five Days List</Text>
                    {/* <TestPush/> */}
                    <Toast
            visible={successToastVisible}
            position={350}
            shadow={false}
            animation={true}
            hideOnPress={true}
            backgroundColor={'#4CBB87'}
            opacity={1}
        >Congratulation you have successfully completed a task {taskNameInToast}!</Toast>

        <Toast
            visible={deleteToastVisible}
            position={350}
            shadow={false}
            animation={true}
            hideOnPress={true}
            backgroundColor={'#EE001D'}
            opacity={1}
        >You have deleted {taskNameInToast}!
        </Toast>
        <SectionList
                            stickySectionHeadersEnabled={false}
                            ref={scrollRef}
                            sections={sections}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            refreshControl={
                                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                            }
                        />
                    
                </View>
                <AddToDoButton toggleBottomSheet={() => refBottomSheet.current.open()}/>
                <RBSheet
                    ref={refBottomSheet}
                    animationType='fade'
                    onClose={()=>setBtnHeight(defaultBtnHeight)}
                    closeOnDragDown
                    // height={btnHeight}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: btnHeight
                        }
                    }}
                >
                    <View style={styles.bottomSheetContainer}>
                        <AddTask submitHandler={addTaskHandler} onResizeBtnSheet={onResizeBtnSheet}/>
                    </View>
                </RBSheet>
                
            </Layout>
            
        </>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: 'center',
        // backgroundColor: '#EDF1F7',
        // marginTop: 20,
        paddingBottom: 0
    },
    title: {
        // fontFamily: 'Lato-Regular',
        // fontSize: 36,
        // paddingTop: 10,
        paddingBottom: 22,
        color: '#1E262C',
        fontWeight: 'bold'
    },
    list: {
        flex: 1,
        paddingTop: 0,
        padding: 5
    },
    SectionHeaderStyle: {
        paddingTop: 24,
        paddingBottom: 8,
        // backgroundColor: '#CDDC89',
        fontSize: 18,
        paddingHorizontal: 8,
        color: defaultColor,
        fontWeight: 'bold'
    },
    bottomSheetContainer: {
        flex: 1,
        padding: 5
    },
    bottomSheetTitle: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        color: "#666",
        alignSelf: 'center'
    }
})

export default withNavigation(FiveDayScreen)

