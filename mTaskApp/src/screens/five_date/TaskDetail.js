import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import { Layout, Text, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
// import ModalDropdown from 'react-native-modal-dropdown';

import moment from 'moment-timezone'

import TaskDate from '../../components/taskDetail/TaskDate'
import TagUser from '../../components/taskDetail/TagUser';

import { clearSelectedAction } from '../../actions/tag-members-actions'
import { clearTaskItemAction, deleteListFromItemAction } from '../../actions/TaskAction'
import { editTaskAction, getTaskItemAction, getMyTasksAction } from '../../actions/TaskAction';
import TaskLists from '../../components/taskDetail/TaskLists';
import { getMyListsAction, clearListItemAction } from '../../actions/ListActions';
import TaskDesc from '../../components/taskDetail/TaskDesc';
// import { ScrollView } from 'react-native-gesture-handler';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const TaskDetail = (props) => {

    const { navigation } = props
    const dispatch = useDispatch()
    const task = useSelector(state => state.taskReducer.taskItem, []);
    const [desc, setDesc] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const getMyTasks = async () => {
        let id = await AsyncStorage.getItem('userId')
        dispatch(getMyTasksAction(id))
        dispatch(getMyListsAction(id))
    }

    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);
    //     // wait(600)
    //     dispatch(getTaskItemAction(task._id))
    //     .then(()=>{
    //         setRefreshing(false)
    //         getMyTasks()
    //     })
    // }, [refreshing]);
    const onRefresh = () => setRefreshing(!refreshing)

    const editTaskHandler = async (id, data) => {
        await dispatch(editTaskAction(id, data))
        onRefresh()
    }

    const removeListHandler = async (id, data) => {
        await dispatch(deleteListFromItemAction(id, data))
            // .then(onRefresh)
        onRefresh()
    }

    useEffect(()=>{
        dispatch(getTaskItemAction(task._id))
        .then(()=>{
            getMyTasks()
            // dispatch(clearSelectedAction())
            setRefreshing(false)
        })
    },[refreshing])

    // useEffect(() => {
    //     const reload = onRefresh()
    //     // const unMount = navigation.addListener('blur', () => {
    //     //     dispatch(clearSelectedAction())
    //     //     // dispatch(clearTaskItemAction())
    //     // })
    //     return reload
    // }, [reload])

    // console.log(task.listId)


    return (
        <>
            <TopNavigationBar {...props} withBackControl={true} />
            <Layout style={styles.container} >
                <ScrollView
                    disableScrollViewPanResponder={true}
                    // bounces={false}
                    automaticallyAdjustContentInsets={true}
                    // centerContent={true}
                    scrollsToTop={false}
                    contentContainerStyle
                >
                <View style={{ marginBottom: 20 }}>
                    <View style={styles.headerStyle}>
                        <TouchableOpacity
                            style={styles.doneStyle}
                            onPress={() => editTaskHandler(task._id, { completed: !task.completed })}
                        >
                            <FontAwesome
                                name={task.completed === true ? "circle" : "circle-thin"}
                                size={32}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{task.name}</Text>
                    </View>
                    <View style={{ paddingBottom: 20, paddingTop: 5 }}>
                        <Text style={{ color: '#919191', fontSize: 12 }}>Created {moment(task.dateCreated).format('ddd, MMM DD')}</Text>
                    </View>
                </View>

                <TaskDate dateTime={task.dateTime} saveDateTime={editTaskHandler} id={task._id} propStyle={propStyle} />

                <View style={[styles.otherStyle, styles.borderStyle]}>
                    <View style={styles.itemStyle}>
                        <TaskLists taskLists={task.listId} propStyle={propStyle} saveList={editTaskHandler} removeList={removeListHandler} id={task._id} />
                    </View>
                    <View style={styles.itemStyle}>
                        <Feather name="repeat" size={iconSize} />
                        <TouchableOpacity
                            style={styles.touchableStyle}
                            onPress={() => console.log('Repeat')}
                        >
                            <Text style={styles.textStyle}>Repeat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemStyle}>
                        <Feather name="bell" size={iconSize} />
                        <TouchableOpacity
                            style={styles.touchableStyle}
                            onPress={() => console.log('Remind')}
                        >
                            <Text style={styles.textStyle}>Remind Me</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TagUser isSaveTag={true} propStyle={propStyle} tagType={'input'} id={task._id} saveTagUser={editTaskHandler} />

                <View style={[styles.descStyle, styles.borderStyle]}>
                    <TaskDesc 
                        desc={desc} 
                        setDesc={setDesc} 
                        addType={'input'} 
                        isSaveDesc={true} 
                        saveDesc={()=>editTaskHandler(task._id, {description: desc})}
                    />
                </View>
                </ScrollView>

            </Layout>
        </>
    )
}

const iconSize = 24
const borderStyle = {
    borderBottomColor: '#D1D5D8',
    borderBottomWidth: 1
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

const propStyle = { borderStyle: borderStyle, iconSize: iconSize, headerStyle: headerStyle }

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: 'center',
        // backgroundColor: '#EDF1F7',
        paddingTop: 18,
        paddingBottom: 0,
        paddingHorizontal: 15,
        height: '100%'
    },
    headerStyle: {
        flexDirection: 'row',
        // height: 60,
        // backgroundColor: 'gray',
        alignItems: 'center',
        paddingVertical: 5
    },
    headerText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        paddingHorizontal: 20,
        // color: 'white'
        // fontWeight: '700'
    },
    touchableStyle: {
        paddingHorizontal: 20
    },
    textStyle: {
        fontSize: 15,
        color: '#6F7274'
        // height:'100%'
    },
    otherStyle: {
        justifyContent: 'center',
        height: 180
    },
    itemStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    borderStyle: borderStyle,
    tagStyle: {
        paddingVertical: 20,
        // backgroundColor: 'gray'
    },
    tagInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    descStyle: {
        paddingVertical: 20
    },
    descInputStyle: {
        justifyContent: 'center',
        paddingBottom: 10
    }

})


export default TaskDetail