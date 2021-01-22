import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, AsyncStorage, TouchableWithoutFeedback, TouchableHighlight, Keyboard, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import { Layout, Text } from '@ui-kitten/components'
import { getMyListsAction, addListAction, clearListItemAction, deleteListAction, getListItemAction } from '../../actions/ListActions';
import TopNavigationBar from '../five_date/TopNavigationBar';
import CategoryItem from '../../components/categoryList/CategoryItem';
import AddList from '../../components/categoryList/AddList';

import { withNavigation } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import ListDetail from './ListDetail';
import TopNavigationBarList from './TopNavigationBarList';

const Stack = createStackNavigator();

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ListScreen = (props) => {
    const [isLoading, setLoading] = useState(false);
    const scrollRef = createRef()
    const dispatch = useDispatch()
    const refBtnSheet = useRef()
    const lists = useSelector(state => state.listReducer.lists, [])
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getMyLists()
        setRefreshing(false)
    }, [refreshing]);

    const getMyLists = async () => {
        let id = await AsyncStorage.getItem('userId')
        dispatch(getMyListsAction(id))
    }

    const addListHandler = async (listData) => {
        refBtnSheet.current.close()
        await dispatch(addListAction(listData))
        setLoading(!isLoading)
        dispatch(clearListItemAction())
        // onRefresh()
    }

    const editListHandler = (id, data) => {
        console.log('Edit')
        console.log(id)

    }

    const onNavigateDetail = async (id) => {
        console.log('Navigate to: ' + id)
        await dispatch(getListItemAction(id))
        props.navigation.navigate('ListDetail')
    }

    const onDeleteHandler = async (id) => {
        await dispatch(deleteListAction(id))
        setLoading(!isLoading)
        // onRefresh()
    }

    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', async () => {
    //         await getMyLists()
    //         setLoading(false)
    //     })
    //     return unsubscribe
    // }, [props.navigation])
    useEffect(()=>{
        getMyLists()
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    }, [isLoading])

    //Define List Elems
    const renderItem = ({ item }) => (
        <CategoryItem item={item} onNavigateDetail={onNavigateDetail} onDeleteHandler={onDeleteHandler} editListHandler={editListHandler} />
    )

    // console.log(lists)

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
                onRefresh()
            }}
        >
            <>
                {/* <TopNavigationBarList {...props} isDisplayDoneButton={false} /> */}
                <Layout style={styles.container}>
                    <View style={styles.list}>
                        <Text category='h1' style={{fontWeight: 'bold'}}>My Lists</Text>
                        <View style={styles.gridView}>
                            <FlatList
                                ref={scrollRef}
                                data={lists}
                                keyExtractor={list => list._id}
                                renderItem={renderItem}
                                refreshControl={
                                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                                }
                            />

                            <TouchableOpacity onPress={() => {
                                refBtnSheet.current.open()
                            }}>
                                <View style={styles.btnContainer}>
                                    <Text style={styles.btnTextStyle}>Add List</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <RBSheet
                        ref={refBtnSheet}
                        closeOnDragDown
                        height={250}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }
                        }}
                    >
                        <View style={styles.bottomSheetContainer}>
                            {/* <Text style={styles.bottomSheetTitle}>Create a new List</Text> */}
                            <AddList submitHandler={addListHandler} />
                        </View>
                    </RBSheet>
                </Layout>
            </>
        </TouchableWithoutFeedback>
    )
}



export default withNavigation(ListScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#EDF1F7',
        paddingTop: 20
        // alignItems: 'center'
    },
    gridView: {
        marginTop: 20,
        // flex: 1,
        justifyContent: 'center',
    },
    list: {
        flex: 3,
        margin: 5,
        padding: 5
    },
    btnContainer: {
        marginVertical: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        // flex: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderWidth: 1,
        alignItems: 'center'
    },
    btnTextStyle: {
        fontSize: 16

    },
    bottomSheetContainer: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    bottomSheetTitle: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
        color: "#666",
        alignSelf: 'center',
        padding: 10,
        borderBottomWidth: 1
    }
})
