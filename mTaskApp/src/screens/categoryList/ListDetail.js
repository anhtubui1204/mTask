import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, RefreshControl, AsyncStorage, ActivityIndicator } from 'react-native'
import TopNavigationBar from '../five_date/TopNavigationBar'
import { Layout, Text, } from '@ui-kitten/components'
import { list } from '../../constants/url/url'
import { FlatList } from 'react-native-gesture-handler'
import { getListItemAction, deleteTaskFromListAction, getMyListsAction } from '../../actions/ListActions'
import TaskItem from '../../components/tasks/TaskItem'
import { getTaskItemAction, addTaskAction, editTaskAction } from '../../actions/TaskAction'
import AddToDoButton from '../../components/tasks/AddTaskButton'
import sendPushNotification from '../../components/push_notification/API/send-push-notification'
import setLocalNotification from '../../components/push_notification/API/set-local-notification'
import { clearSelectedAction } from '../../actions/tag-members-actions'
import {defaultBtnHeight,defaultColor} from '../../constants/global_variables/global-variables'

import RBSheet from "react-native-raw-bottom-sheet";
import AddTask from '../../components/tasks/AddTask'
import TopNavigationBarList from './TopNavigationBarList'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ListDetail = (props) => {
    const [isLoading, setLoading] = useState(false);
    const refBottomSheet = useRef();
    const dispatch = useDispatch()
    const listItem = useSelector(state => state.listReducer.listItem, [])
    const tasks = listItem.items ? listItem.items : []
    const completedTasks = tasks.filter(task => task.completed === false)
    const [refreshing, setRefreshing] = useState(false)
    const [btnHeight, setBtnHeight] = useState(defaultBtnHeight)

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await dispatch(getListItemAction(listItem._id))
        setRefreshing(false)
        getMyLists()
    }, [refreshing])

    const getMyLists = async () => {
        let id = await AsyncStorage.getItem('userId')
        dispatch(getMyListsAction(id))
    }

    const deleteHandler = async (item) => {
        const listID = listItem._id
        const removeTaskData = {
            taskId: item._id
        }
        await dispatch(deleteTaskFromListAction(listID, removeTaskData))
        setLoading(!isLoading)
        // onRefresh()
    }

    const editTaskHandler = async (item, data) => {
        await dispatch(editTaskAction(item._id, data))
        setLoading(!isLoading)
        // onRefresh()
    }

    const onNavigateDetail = (id) => {
        dispatch(getTaskItemAction(id))
            .then(() => props.navigation.navigate('TaskDetail'))
    }

    const handlePushNoti = (taskObj) => {
        var taggedUsers = taskObj.taggedUsers
        if (taggedUsers.length >= 1) {
            for (let i = 0; i < taggedUsers.length; i++) {
                var userObj = taggedUsers[i]
                var expoPushToken = userObj.expoPushToken
                sendPushNotification(userObj, taskObj)
            }
        }
    }

    const addTaskHandler = async (taskObj) => {
        const data = { ...taskObj, listId: listItem._id }
        console.log('addTAskHandler: ', data)
        handlePushNoti(taskObj)
        setLocalNotification(taskObj.name, 'Click here to view more', taskObj.dateTime)
        if (taskObj.name.length > 3) {
            refBottomSheet.current.close()
            await dispatch(addTaskAction(data))
            setLoading(!isLoading)
            dispatch(clearSelectedAction())
            // onRefresh()
            
        } else {
            Alert.alert('Warning!!!', 'Todos must be over 3 characters long', [
                { text: 'Understood' }
            ])
        }
    }

    const renderItem = ({ item, index }) => (
        <TaskItem
            isShowDate={true}
            item={item}
            index={index}
            deleteHandler={deleteHandler}
            editTaskHandler={editTaskHandler}
            onNavigateDetail={onNavigateDetail}
        />
    )

    const onNavigateDoneDetail = () => {
        console.log('Navigate')
        props.navigation.navigate('DoneTasksByList')

    }

    const onResizeBtnSheet = (i) => setBtnHeight(btnHeight + i)

    useEffect(()=>{
        // getMyLists()
        dispatch(getListItemAction(listItem._id))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    }, [isLoading])

    return (
        <>
            <TopNavigationBarList {...props} withBackControl={true} isDisplayDoneButton={true} onNavigateDoneDetail={onNavigateDoneDetail} />
            <Layout style={styles.container}>
                <View style={styles.list}>
                    <Text category='h1' style={{ fontWeight: 'bold' }}>{listItem.name}</Text>
                    <View style={styles.gridView}>
                        <FlatList
                            data={completedTasks}
                            keyExtractor={task => task._id}
                            renderItem={renderItem}
                            refreshControl={
                                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                            }
                        />
                    </View>
                </View>
            </Layout>
            <AddToDoButton toggleBottomSheet={() => refBottomSheet.current.open()} />
            <RBSheet
                animationType='slide'
                ref={refBottomSheet}
                closeOnDragDown
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: btnHeight
                    }
                }}
            >
                <View style={styles.bottomSheetContainer}>
                    {/* <Text style={styles.bottomSheetTitle}>Create a new task</Text> */}
                    <AddTask submitHandler={addTaskHandler} onResizeBtnSheet={onResizeBtnSheet} />
                </View>
            </RBSheet>

        </>
    )
}

export default ListDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#EDF1F7',
    },
    list: {
        flex: 1,
        padding: 10
    },
    gridView: {
        marginTop: 20,
        justifyContent: 'center',
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
