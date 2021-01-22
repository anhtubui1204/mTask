import React, { useState, useRef, useCallback, useEffect } from 'react'
import { StyleSheet, View, SectionList, Modal, TouchableOpacity, RefreshControl } from 'react-native'
import TopNavigationBarList from './TopNavigationBarList'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Text, Button } from '@ui-kitten/components'
import TimeFormat from '../doneList/TimeFormat'
import TimeAgo from '../doneList/TimeAgo'

import _ from 'lodash'
import moment from 'moment';
import { getListItemAction } from '../../actions/ListActions'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const DoneTasksByList = (props) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const listItem = useSelector(state => state.listReducer.listItem, [])
    const tasks = listItem.items ? listItem.items : []
    const [show, setShow] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{
        // getMyLists()
        dispatch(getListItemAction(listItem._id))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    }, [isLoading])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getListItemAction(listItem._id))
            .then(setRefreshing(false))
    }, [refreshing])

    const completedTask = tasks.filter(d => d.completed === true)
    const sortbyDate = completedTask.sort((first, second) => {
        return new Date(second.dateTime).getTime() - new Date(first.dateTime).getTime();
    });
    const groupbydate = _.groupBy(sortbyDate, task => moment(task.dateTime).format('MMMM Do YYYY'))
    const newList = _.reduce(groupbydate, (acc, next, index) => {
        acc.push({
            title: index,
            data: next
        })
        return acc
    }, [])

    const renderHeader = ({ section }) => {
        return (
            <View style={styles.header} >
                <Text style={{ fontSize: 20, color: '#6375df' }}>{section.title}</Text>
            </View>
        )
    }

    const _renderItem = ({ item }) => {
        const taggedList = item.taggedUsers ? item.taggedUsers.map((i, index) =>
            <Text key={index} style={{ fontSize: 15, textAlign: "center" }}>{i.fName}</Text>
        ) : null
        return (
            <View>
                <Modal
                    transparent={true}
                    visible={show}
                >
                    <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                        <View style={{ backgroundColor: "#ffffff", marginHorizontal: 50, marginVertical: 100, padding: 40, borderRadius: 10, flex: 1 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textAlign: "center" }}>Task Title</Text>
                                <Text style={{ fontSize: 15, textAlign: "center" }}>{item.name}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textAlign: "center" }}>Description</Text>
                                <Text style={{ fontSize: 15, textAlign: "center" }}>{item.description}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textAlign: "center" }}>Completed Time</Text>
                                <TimeFormat time={item.dateTime} />
                            </View>

                            {item.taggedUsers.length !== 0 && (
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ fontSize: 20, textAlign: "center" }}>Tagged Friend</Text>
                                    {taggedList}
                                </View>
                            )}

                            <View style={{ marginLeft: '50%', marginBottom: 36, position: 'absolute', bottom: 0 }}>
                                <Button onPress={() => { setShow(false) }}>Back</Button>
                            </View>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => setShow(true)}>
                    <View style={styles.item}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", }}>{item.name}</Text>
                        <Text style={{ fontSize: 15 }}><TimeAgo time={item.dateTime} /></Text>
                    </View>
                </TouchableOpacity>


            </View>

        )
    };


    return (
        <View style={{ paddingTop: 20 }}>
            <TopNavigationBarList {...props} isDisplayDoneButton={false} withBackControl={true} />
            <Layout style={{ paddingTop: 10, paddingBottom: 0, paddingHorizontal: 10 }}>
                <Text style={{ textAlign: "center" }} category='h1'>Completed {listItem.name}</Text>


                <View style={{ paddingBottom: '27%' }}>
                    <SectionList
                        sections={newList}
                        renderSectionHeader={renderHeader}
                        renderItem={_renderItem}
                        keyExtractor={item => item._id}
                        refreshControl={
                            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                        }
                    />
                </View>


            </Layout>
        </View>
    )
}

export default DoneTasksByList

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        paddingTop: 20,
        paddingLeft: 10,
        backgroundColor: 'white',
        paddingBottom: 3,
    }
})
